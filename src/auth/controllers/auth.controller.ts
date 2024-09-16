import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import debug from "debug";


const log: debug.IDebugger = debug("app:auth-controller");

const jwtSecret = String(process.env.JWT_SECRET);
const tokenExpirationSeconds = 30000;

class AuthController {
  async createJWT(req: Request, res: Response) {
    try {
      const refreshId = req.body.userId + jwtSecret;      
      const salt = crypto.createSecretKey(crypto.randomBytes(16));
      const hash = crypto
        .createHmac("sha512", salt)
        .update(refreshId)
        .digest("base64");

      req.body.refreshKey = salt.export();
      const token = jwt.sign(req.body, jwtSecret, {
        expiresIn: tokenExpirationSeconds,
      });

      return res.status(201).json({ accsessToken: token, refreshToken: hash });
    } catch (error) {
      log(`Create JWT err: %O`, error);
      res.status(500).json({});
    }
  }
}

export default new AuthController();
