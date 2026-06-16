import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/AppError";
import { AuthRequest } from "../types/auth-request";

export const authorize =
  (...roles: string[]) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {

    

    const requser = (req as AuthRequest).user;
    if (!requser) {
      return next(
        new AppError(
          "Unauthorized",
          401
        )
      );
    }

    if (
      !roles.includes(
        requser.role
      )
    ) {
      return next(
        new AppError(
          "Forbidden",
          403
        )
      );
    }

    next();
  };