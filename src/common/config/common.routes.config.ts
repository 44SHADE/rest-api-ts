import express from "express";

export abstract class CommonRoutesConfig {
    protected _app: express.Application;
    protected _name: string;

    constructor(app: express.Application, name: string) {
        this._app = app;
        this._name = name
        this.configureRoutes();
    }

    abstract configureRoutes(): express.Application;

    public getName() {
        return this._name;
    }
}