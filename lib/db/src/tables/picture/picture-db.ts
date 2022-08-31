import { PictureTbl } from '@dto'
import { Db } from '../../engine/db'
import { SqlBuilder } from '../../engine/sql-builder'

export class PictureDb extends Db {

    table = 'picture'

    async insert(obj: PictureTbl): Promise<number> {
        const insert = SqlBuilder.insertBuilder(this.table, obj)
        return await this.dbExecute(insert.sql, insert.values)
            .then(data => data.affectedRows)
    }

    async select(obj: PictureTbl, whereObj: PictureTbl): Promise<PictureTbl> {
        const select = SqlBuilder.selectBuilder(this.table, obj, whereObj)
        return await this.dbQuery(select.sql, select.values)
            .then(data => data ? data[0] : undefined)
    }

    async update(obj: PictureTbl, whereObj: PictureTbl): Promise<number> {
        const update = SqlBuilder.updateBuilder(this.table, obj, whereObj)
        return await this.dbExecute(update.sql, update.values)
            .then(data => data.affectedRows)
    }

    async delete(picture_id: string): Promise<number> {
        return await this.dbExecute(
            `DELETE FROM 
                    picture 
                WHERE 
                    picture_id = ?`,
            picture_id)
            .then(data => data.affectedRows)
    }

    // async insert(picture: PictureTbl): Promise<boolean> {
    //     return await this.dbExecute(
    //         `INSERT INTO picture (
    //                 picture_id,
    //                 name,
    //                 ext,
    //                 size,
    //                 height,
    //                 width,
    //                 content
    //             )
    //             VALUES (?, ?, ?, ?, ?, ?, ?)`,
    //         picture.addArr)
    //         .then(data => data.affectedRows === 1)
    // }

    // async select(picture_id: string): Promise<PictureTbl> {
    //     return await this.dbQuery(
    //         `SELECT
    //                 picture_id,
    //                 name,
    //                 ext,
    //                 size,
    //                 height,
    //                 width,
    //                 content
    //             FROM
    //                 picture
    //             WHERE
    //                 picture_id = ?`,
    //         picture_id)
    //         .then(data => data ? data[0] : undefined)
    // }
    //
    // async update(picture: PictureTbl): Promise<boolean> {
    //     return await this.dbExecute(
    //         `UPDATE
    //                 picture
    //             SET
    //                 name=?,
    //                 ext=?,
    //                 size=?,
    //                 height=?,
    //                 width=?,
    //                 content=?
    //             WHERE
    //                 picture_id = ?`,
    //         picture.updateArr)
    //         .then(data => data.affectedRows === 1)
    // }

}
