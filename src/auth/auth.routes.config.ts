import { CommonRoutesConfig } from "../common/config/common.routes.config";
import authController from "./controllers/auth.controller";
import authMiddleware from "./middleware/auth.middleware";
import jwtMiddleware from "./middleware/jwt.middleware";
import { body } from "express-validator";
import { Application } from "express";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "AuthRoutes");
  }
  configureRoutes(): Application {
    this._app.post("/auth", [
      body("email").isEmail(),
      body("password").isString(),
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);

    this._app.post(`/auth/refresh-token`, [
        jwtMiddleware.validJWTNeeded,
        jwtMiddleware.verifyRefreshBodyField,
        jwtMiddleware.validRefreshTokenNeeded,
        authController.createJWT,
    ]);

    return this._app;
  }
}
