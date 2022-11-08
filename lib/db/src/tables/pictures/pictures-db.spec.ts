import { PicturesTbl } from '@dto'
import { environment } from '@env'
import chai from 'chai'
import { afterEach, beforeEach } from 'mocha'
import { Db } from '../../engine'
import { PicturesDb } from './pictures-db'

const expect = chai.expect

describe('PictureDb', () => {

    const PicturesTbl = <PicturesTbl>{
        picture_id: 'ce12ddca-1f9f-11ed-861d-0242ac120002',
        name: 'avatar',
        ext: 'png',
        height: 40,
        width: 50,
        content: Buffer.from('0', 'hex')
    }

    const pool = Db.createPool(environment.db)
    after(async () => {
        await pool.end()
    })

    // clear test data
    beforeEach(async () => {
        const pictureDb = new PicturesDb(pool)
        await pictureDb.delete({picture_id: PicturesTbl.picture_id})
    })
    afterEach(async () => {
        const pictureDb = new PicturesDb(pool)
        await pictureDb.delete({picture_id: PicturesTbl.picture_id})
    })


    it('insert', async () => {
        const pictureDb = new PicturesDb(pool)
        const res = await pictureDb.insert(PicturesTbl)
        expect(res).to.be.eq(1)
    })

    it('update & select', async () => {
        const conn = await pool.getConnection()
        const pictureDb = new PicturesDb(conn)
        await conn.beginTransaction()
        await pictureDb.insert(PicturesTbl)
        PicturesTbl.name += 'u'
        PicturesTbl.ext += 'u'
        PicturesTbl.height += 10
        PicturesTbl.width += 10
        PicturesTbl.content = Buffer.from('1', 'hex')
        const res = await pictureDb.update(
            PicturesTbl,
            <PicturesTbl>{picture_id: PicturesTbl.picture_id}
        )
        expect(res).to.be.eq(1)
        const select = await pictureDb.select(
            PicturesTbl,
            <PicturesTbl>{picture_id: PicturesTbl.picture_id}
        )
        await conn.commit()
        expect(select).to.deep.eq(PicturesTbl)
    })

    it('delete', async () => {
        const pictureDb = new PicturesDb(pool)
        await pictureDb.insert(PicturesTbl)
        const res = await pictureDb.delete({picture_id: PicturesTbl.picture_id})
        expect(res).to.be.eq(1)
    })

})
