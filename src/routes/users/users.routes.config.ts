import UsersController from "./controllers/users.controller";
import UsersMiddleware from "./middleware/users.middleware";
import { CommonRoutesConfig } from "../../common/config/common.routes.config";
import { PermissionFlags } from "../../common/middleware/common.permissionFlags.enum";
import commonPermissionMiddleware from "../../common/middleware/common.permission.middleware";
import jwtMiddleware from "../../auth/middleware/jwt.middleware";
import express from "express";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this._app
      .route("/users")
      .get(
        jwtMiddleware.validJWTNeeded,
        commonPermissionMiddleware.permissionFlagRequired(
          PermissionFlags.CHAT_ADMIN_PERMISSION
        ),
        UsersController.listUsers
      )
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    this._app.param("userId", UsersMiddleware.extractUserId);
    this._app
      .route("/users/:userId")
      .all(
        UsersMiddleware.validatUserExist,
        jwtMiddleware.validJWTNeeded,
        commonPermissionMiddleware.onlyUserOrAdminCanDoThisAction
      )
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this._app
      .route("/users/:userId")
      .put([
        UsersMiddleware.validatUserExist,
        UsersMiddleware.validateSameEmailBelongToSameUser,
        UsersMiddleware.userCantChangePermission,
        commonPermissionMiddleware.permissionFlagRequired(PermissionFlags.PAID_PERMISSION),
        UsersController.put,
      ]);

    this._app
      .route("/users/:userId")
      .patch([
        UsersMiddleware.validatePathcEmail,
        UsersMiddleware.userCantChangePermission,
        commonPermissionMiddleware.permissionFlagRequired(PermissionFlags.PAID_PERMISSION),
        UsersController.patch,
      ]);

    return this._app;
  }
}
