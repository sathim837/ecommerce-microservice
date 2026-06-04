import { Request, Response, NextFunction } from "express";

import { AppError } from "./AppError";

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    } else {
        console.error("Unexpected error:", err);
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred"
        });
    }
};