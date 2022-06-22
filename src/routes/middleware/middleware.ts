import { NextFunction, Request, Response } from "express";

export function doSomethingInteresting(req: Request, res: Response, next: NextFunction) {
    // Middleware goes here
    next()
}

// export const asyncCatch = (fn: RequestHandler) => async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): Promise<void> => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         next(error);
//     }
// };
//
// // Sample controller code:
//
// export const getUsers: RequestHandler = asyncCatch( async (req, res, next) => {
// // Your code
// })