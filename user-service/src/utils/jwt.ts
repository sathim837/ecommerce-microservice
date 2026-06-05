import jwt from "jsonwebtoken";
import { AppError } from '../middlewares/AppError';

interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

export const generateToken = (payload: JwtPayload): string => {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
        throw new AppError("JWT configuration is missing", 500);
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    } as jwt.SignOptions);
}