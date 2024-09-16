import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { jwtType } from "../../common/types/jwt";
import userService from "../../routes/users/services/user.service";

const jwtSecret = String(process.env.JWT_SECRET);

class jwtMiddleware {
  verifyRefreshBodyField(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      return res
        .status(400)
        .json({ error: [`Missing required field: refreshToken`] });
    }
  }

  async validRefreshTokenNeeded(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user: any = await userService.getUserByEmailWithPassword(
      res.locals.jwt.email
    );
    
    const salt = crypto.createSecretKey(Buffer.from(res.locals.jwt.refreshKey.data));
    const hash = crypto
      .createHmac("sha512", salt)
      .update(res.locals.jwt.userId + jwtSecret)
      .digest("base64");
      
    if (hash === req.body.refreshToken) {
      req.body = {
        userId: user._id,
        email: user.email,
        permissionFlags: user.permissionFlags,
      };

      return next();
    } else {
      return res.status(400).json({ error: ["Invalid refresh token"] });
    }
  }

  validJWTNeeded(req: Request, res: Response, next: NextFunction) {
    if (req.headers["authorization"]) {
      try {
        const authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
          return res.status(401).json();
        } else {
          res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as jwtType;
          next();
        }
      } catch (error) {
        return res.status(403).json({ error: error });
      }
    } else {
      return res.status(401).json();
    }
  }
}

export default new jwtMiddleware();
