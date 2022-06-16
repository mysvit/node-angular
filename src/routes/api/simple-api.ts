import { simpleList } from '@core/core.js'
import { Request, Response } from 'express'

// apiUrl+/simple/get
export async function simpleGet(req: Request, res: Response) {
    res.status(200).json(await simpleList())
    // res.status(200).json({name:1})
}
