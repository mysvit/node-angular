import { PictureTbl } from '@dto'
import { Db } from '../../engine/db'

export class PictureDb extends Db {

    async insert(picture: PictureTbl): Promise<boolean> {
        return await this.dbExecute(
            `INSERT INTO picture (
                    picture_id,
                    name, 
                    ext,
                    size, 
                    height, 
                    width, 
                    content
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
            picture.addArr)
            .then(data => data.affectedRows === 1)
    }

    async select(picture_id: string): Promise<PictureTbl> {
        return await this.dbQuery(
            `SELECT 
                    picture_id,
                    name, 
                    ext, 
                    size,
                    height, 
                    width, 
                    content
                FROM 
                    picture 
                WHERE 
                    picture_id = ?`,
            picture_id)
            .then(data => data ? data[0] : undefined)
    }

    async update(picture: PictureTbl): Promise<boolean> {
        return await this.dbExecute(
            `UPDATE
                    picture
                SET
                    name=?,
                    ext=?,
                    size=?, 
                    height=?,
                    width=?,
                    content=?
                WHERE
                    picture_id = ?`,
            picture.updateArr)
            .then(data => data.affectedRows === 1)
    }

    async delete(picture_id: string) {
        return await this.dbExecute(
            `DELETE FROM 
                    picture 
                WHERE 
                    picture_id = ?`,
            picture_id)
            .then(data => data.affectedRows === 1)
    }
}
