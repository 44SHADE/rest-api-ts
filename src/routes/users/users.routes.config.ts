import express from "express";
import { CommonRoutesConfig } from "../../common/config/common.routes.config";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {

    this._app.route("/users")
        .get()
        .post()

    this._app.route("/users/:id")
        .all()
        .get()
        .delete()

    this._app.route("/users/:id")
        .put();


    this._app.route("/users/:id")
        .patch();
        
    return this._app;
  }
}
