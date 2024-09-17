import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:users-controller");

class UsersMiddleware {
  async validateRequiredUserBodyFields(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.body && req.body.email && req.body.password && req.body.username) {
      next();
    } else {
      res.status(400).json({ error: "Missing required fields" });
    }
  }

  async validateSameEmailDoesntExist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).json({ error: "User email already exist" });
    } else {
      next();
    }
  }

  async validateSameEmailBelongToSameUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if ( res.locals.user._id === req.params.userId) {
      next();
    } else {
      res.status(400).json({ error: "Invalid email" });
    }
  }

  validatePathcEmail = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.email) {
      this.validateSameEmailBelongToSameUser(req, res, next);
    } else {
      next();
    }
  };

  async validatUserExist(req: Request, res: Response, next: NextFunction) {
    const user = await userService.readById(req.params.userId);
    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.status(400).json({ error: `User ${req.params.userId} not found` });
    }
  }

  async userCantChangePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (
      "permissionFlags" in req.body &&
      req.body.permissionFlags !== res.locals.user.PermissionFlags
    ) {
      res.status(400).json({ error: ["User cannot change permission."] });
    } else {
      next()
    }
  }

  async extractUserId(req: Request, res: Response, next: NextFunction) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware();
