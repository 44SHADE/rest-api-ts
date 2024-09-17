import { Request, Response, NextFunction } from "express";
import { PermissionFlags } from "./common.permissionFlags.enum";
import debug from "debug";

const log: debug.IDebugger = debug("app:common-permission-middleware");

class CommonPermissionFlags {
  permissionFlagRequired(requiredFlag: number) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const userPermissionFlag = parseInt(res.locals.jwt.permissionFlags);
        if (userPermissionFlag & requiredFlag) {
          next();
        } else {
          res.status(403).json({});
        }
      } catch (error) {
        log(error);
      }
    };
  }

  async onlyUserOrAdminCanDoThisAction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userPermissionFlag = parseInt(res.locals.jwt.permissionFlags);

    if (
      req.params &&
      req.params.userId &&
      req.params.userId === res.locals.jwt.userId
    ) {
      return next();
    } else {
      if (userPermissionFlag & PermissionFlags.CHAT_ADMIN_PERMISSION) {
        return next();
      } else {
        return res.status(403).json({});
      }
    }
  }
}

export default new CommonPermissionFlags();