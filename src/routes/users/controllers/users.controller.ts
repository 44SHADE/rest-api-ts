import { Request, Response } from "express";
import userService from "../services/user.service";
import * as argon2 from "argon2";
import debug from "debug";

const log: debug.IDebugger = debug("app:users-controller");

class UsersController {
  async listUsers(req: Request, res: Response) {
    const users = await userService.list(50, 0);
    res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response) {
    const user = await userService.readById(req.body.id);
    res.status(200).json(user);
  }

  async createUser(req: Request, res: Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await userService.create(req.body);
    res.status(201).json({ id: userId });
  }

  async put(req: Request, res: Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await userService.putById(req.body.id, req.body));
    res.status(204).json();
  }

  async patch(req: Request, res: Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    log(await userService.patchById(req.body.id, req.body));
    res.status(204).json();
  }

  async removeUser(req: Request, res: Response) {
    log(await userService.deleteById(req.body.id));
    res.status(204).json();
  }
};

export default new UsersController();
