import { DateDb } from '@dto'
import chai from 'chai'
import { getValues, SqlBuilder } from './sql-builder'

const expect = chai.expect

describe('SqlBuilder', () => {

    const testObj = {
        string_field: 'string',
        date_field: new DateDb().value,
        number_field: 12345,
        null_date: null
    }

    const whereObj = {
        string_field: 'string',
        date_field: new DateDb().value,
        number_field: 12345,
        null_date: null
    }

    it('insertBuilder', async () => {
        const insert = SqlBuilder.insertBuilder('table', testObj)
        expect(insert.sql).to.be.eq('INSERT INTO table (string_field,date_field,number_field,null_date) VALUES (?,?,?,?)')
        expect(insert.values).to.deep.eq([testObj.string_field, testObj.date_field, testObj.number_field, testObj.null_date])
    })

    it('selectBuilder', async () => {
        const select = SqlBuilder.selectBuilder('table', testObj, undefined)
        expect(select.sql).to.be.eq('SELECT string_field,date_field,number_field,null_date FROM table')
        expect(select.values).to.deep.eq([])
    })

    it('selectBuilder WHERE', async () => {
        const select = SqlBuilder.selectBuilder('table', testObj, whereObj)
        expect(select.sql).to.be.eq(
            'SELECT string_field,date_field,number_field,null_date FROM table' +
            ' WHERE string_field=? AND date_field=? AND number_field=? AND null_date=?'
        )
        expect(select.values).to.deep.eq([testObj.string_field, testObj.date_field, testObj.number_field, testObj.null_date])
    })

    it('updateBuilder', async () => {
        const update = SqlBuilder.updateBuilder('table', testObj, whereObj)
        expect(update.sql).to.be.eq(
            'UPDATE table SET string_field=?,date_field=?,number_field=?,null_date=?' +
            ' WHERE string_field=? AND date_field=? AND number_field=? AND null_date=?'
        )
        expect(update.values).to.deep.eq([
            testObj.string_field, testObj.date_field, testObj.number_field, testObj.null_date,
            testObj.string_field, testObj.date_field, testObj.number_field, testObj.null_date])
    })

    it('getValues', async () => {
        let values = getValues(undefined)
        expect(values).to.deep.eq([])
        values = getValues(testObj)
        expect(values).to.deep.eq([testObj.string_field, testObj.date_field, testObj.number_field, testObj.null_date])
    })

})
