import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AppError } from "../middlewares/AppError";
import { verifyToken } from "../utils/jwt";
import { AuthRequest } from "../types/auth-request";

export const authenticate =
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      return next(
        new AppError(
          "Unauthorized",
          401
        )
      );
    }

    const token =
      authHeader.split(" ")[1];

    try {

      const decoded =
        verifyToken(token);

    //   req.user = decoded;

      (req as AuthRequest).user = decoded;

      next();

    } catch {

      next(
        new AppError(
          "Invalid token",
          401
        )
      );
    }
  };