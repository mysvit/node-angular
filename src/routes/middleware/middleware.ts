import { NextFunction, Request, Response } from "express";

export function doSomethingInteresting(req: Request, res: Response, next: NextFunction) {
    // Middleware goes here
    next()
}