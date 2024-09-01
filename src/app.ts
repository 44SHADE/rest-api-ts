import express from "express";
import { Server, createServer } from "http";

import * as express_winston from "express-winston";
import cors from "cors";
import dotenv from "dotenv";
import debug from "debug";

import { CommonRoutesConfig } from "./common/config/common.routes.config";
import { UsersRoutes } from "./routes/users/users.routes.config";
import { loggerConfig } from "./common/config/expr_win.config";

const app: express.Application = express();
const http: Server = createServer(app);
const port: number = Number(process.env.PORT) || 3000;
const router: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express_winston.logger(loggerConfig));

router.push(new UsersRoutes(app));

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("SERVER OK");
});

http.listen(port, () => {
  router.forEach((route: CommonRoutesConfig) => {
    debugLog(`Router online: ${route.getName()}`);
  });

  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
