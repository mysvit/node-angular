import { PictureTbl } from '@dto'
import { environment } from '@env'
import chai from 'chai'
import { afterEach, beforeEach } from 'mocha'
import { Db } from '../../engine'
import { PictureDb } from './picture-db'

const expect = chai.expect

describe('PictureDb', () => {

    const pictureTbl = <PictureTbl>{
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
        const pictureDb = new PictureDb(pool)
        await pictureDb.delete({picture_id: pictureTbl.picture_id})
    })
    afterEach(async () => {
        const pictureDb = new PictureDb(pool)
        await pictureDb.delete({picture_id: pictureTbl.picture_id})
    })


    it('insert', async () => {
        const pictureDb = new PictureDb(pool)
        const res = await pictureDb.insert(pictureTbl)
        expect(res).to.be.eq(1)
    })

    it('update & select', async () => {
        const conn = await pool.getConnection()
        const pictureDb = new PictureDb(conn)
        await conn.beginTransaction()
        await pictureDb.insert(pictureTbl)
        pictureTbl.name += 'u'
        pictureTbl.ext += 'u'
        pictureTbl.height += 10
        pictureTbl.width += 10
        pictureTbl.content = Buffer.from('1', 'hex')
        const res = await pictureDb.update(
            pictureTbl,
            <PictureTbl>{picture_id: pictureTbl.picture_id}
        )
        expect(res).to.be.eq(1)
        const select = await pictureDb.select(
            pictureTbl,
            <PictureTbl>{picture_id: pictureTbl.picture_id}
        )
        await conn.commit()
        expect(select).to.deep.eq(pictureTbl)
    })

    it('delete', async () => {
        const pictureDb = new PictureDb(pool)
        await pictureDb.insert(pictureTbl)
        const res = await pictureDb.delete({picture_id: pictureTbl.picture_id})
        expect(res).to.be.eq(1)
    })

})
