import { PictureTbl } from '@dto'
import { environment } from '@env'
import chai from 'chai'
import { after, before } from 'mocha'
import { PictureDb } from './picture-db'

const expect = chai.expect

describe('PictureDb', () => {

    const pictureDb = new PictureDb(environment)
    const pictureTbl = <PictureTbl>{
        picture_id: 'ce12ddca-1f9f-11ed-861d-0242ac120002',
        name: 'avatar',
        ext: 'png',
        size: 1024,
        height: 40,
        width: 50,
        content: Buffer.from('0', 'hex')
    }

    before(() => {
    })

    // clear test data
    after(async () => {
        const conn = await pictureDb.getConnection
        try {
            await conn.execute('DELETE FROM picture WHERE picture_id = ?', pictureTbl.picture_id)
        } finally {
            if (conn) await conn.release()
        }
    })

    it('insert', async () => {
        const res = await pictureDb.insert(pictureTbl)
        expect(res).to.be.eq(true)
    })

    it('update & select', async () => {
        pictureTbl.name += 'u'
        pictureTbl.ext += 'u'
        pictureTbl.height += 10
        pictureTbl.width += 10
        pictureTbl.content = Buffer.from('1', 'hex')
        const res = await pictureDb.update(
            pictureTbl,
            <PictureTbl>{picture_id: pictureTbl.picture_id}
        )
        expect(res).to.be.true
        const select = await pictureDb.select(
            pictureTbl,
            <PictureTbl>{picture_id: pictureTbl.picture_id}
        )
        expect(select).to.deep.eq(pictureTbl)
    })

    it('delete', async () => {
        const res = await pictureDb.delete(pictureTbl.picture_id)
        expect(res).to.be.true
    })

})
