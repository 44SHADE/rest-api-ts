import User from "../../../models/users.model";

import { ICreateUserDto } from "../dto/crate.user.dto";
import { IPatchUserDto } from "../dto/patch.user.dto";
import { IPutUserDto } from "../dto/put.user.dto";

import shortid from "shortid";
import debug from "debug";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDao {
  constructor() {
    log("Created new inst of UsersDao");
  }

  async addUser(user: ICreateUserDto) {
    const userId = shortid.generate();
    const newUser = await User.create({
      _id: userId,
      ...user,
    });
    await newUser.save();
    return userId;
  }

  async getUsers(limit = 25, page = 0) {
    return User.find({})
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getUserByEmail(email: string) {
    return User.findOne({ email: email }).exec();
  }

  async getUserByName(username: string) {
    return User.findOne({ username: username }).exec();
  }

  async getUserById(userId: string) {
    return User.findOne({ _id: userId }).exec();
  }

  async deleteUserById(userId: string) {
    return User.deleteOne({ _id: userId }).exec();
  }

  async updateUser(userId: string, userFields: IPatchUserDto | IPutUserDto) {
    return User.findByIdAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();
  }
}

export default new UsersDao();
