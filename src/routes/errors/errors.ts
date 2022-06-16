// Handle any errors that come up
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export function errorHandle(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    // if (err.status) {
    //     res.status(err.status).json({'message': err.message})
    // } else {
        console.error(err)
        res.status(500).json({message: 'Internal server error'})
    // }
}

// // Handle case where user requests nonexistent endpoint
// exports.nullRoute = (req: Request, res: Response, next: NextFunction) => {
//   res.status(404).json({message: 'not found'})
// }

// Create an error for the api error handler
// exports.newHttpError = (status, message) => {
//     let err;
//     if (message === null || message === undefined) {
//         err = new Error();
//     } else {
//         err = new Error(message);
//     }
//     err.status = status;
//     return err;
// }


// Handle case where user requests nonexistent endpoint
export function nullRoute(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({message: 'NOT FOUND'})
}
