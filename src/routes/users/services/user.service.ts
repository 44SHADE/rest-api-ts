import UsersDao from "../daos/users.dao";
import { CRUD } from "../../../common/interfaces/CRUD";
import { ICreateUserDto } from "../dto/crate.user.dto";
import { IPutUserDto } from "../dto/put.user.dto";
import { IPatchUserDto } from "../dto/patch.user.dto";
import { Document } from "mongoose";

class UsersService implements CRUD {
    async list(limit: number, page: number): Promise<Document[] | null> {
        return UsersDao.getUsers(limit, page);
    }
    async create(resource: ICreateUserDto): Promise<string> {
        return UsersDao.addUser(resource);
    }
    async readById(id: string): Promise<Document | null> {
        return UsersDao.getUserById(id);
    }
    async putById(id: string, resource: IPutUserDto): Promise<Document | null> {
        return UsersDao.updateUser(id, resource);
    }
    async patchById(id: string, resource: IPatchUserDto): Promise<Document | null> {
        return UsersDao.updateUser(id, resource);
    }
    async deleteById(id: string): Promise<any> {
        return UsersDao.deleteUserById(id);
    }

    async getUserByEmail(email: string): Promise<Document | null> {
        return UsersDao.getUserByEmail(email);
    }

    async getUserByEmailWithPassword(email: string): Promise<Document | null> {
        return UsersDao.getUserByEmailWithPassword(email);
    }
}

export default new UsersService();