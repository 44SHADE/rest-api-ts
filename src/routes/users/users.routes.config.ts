import UsersController from "./controllers/users.controller";
import UsersMiddleware from "./middleware/users.middleware";
import { CommonRoutesConfig } from "../../common/config/common.routes.config";
import express from "express";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this._app
      .route("/users")
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    this._app.param("userId", UsersMiddleware.extractUserId);
    this._app
      .route("/users/:userId")
      .all(UsersMiddleware.validatUserExist)
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this._app
      .route("/users/:userId")
      .put([
        UsersMiddleware.validatUserExist,
        UsersMiddleware.validateSameEmailBelongToSameUser,
        UsersController.put,
      ]);

    this._app
      .route("/users/:userId")
      .patch([UsersMiddleware.validatePathcEmail, UsersController.patch]);

    return this._app;
  }
}
