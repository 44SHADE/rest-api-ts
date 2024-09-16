import {Request, Response, NextFunction} from "express";
import userService from "../../routes/users/services/user.service";
import * as argon2 from "argon2";

class AuthMiddleware {
    async verifyUserPassword (req: Request, res: Response, next: NextFunction) {
        const user: any = await userService.getUserByEmailWithPassword(req.body.email);
        if(user) {
            const passwordHash = user.password;
            const verify = await argon2.verify(passwordHash, req.body.password);

            if(verify) {
                req.body = {
                    userId: user._id,
                    email: user.email,
                    permissionFlags: user.permissionFlags
                }

                return next()
            }
        }

        res.status(401).json({error: ["Invalid email and/or password"]});
    }
}

export default new AuthMiddleware();