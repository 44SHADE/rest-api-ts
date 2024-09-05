import { Document } from "mongoose";
import { ICreateUserDto } from "../../routes/users/dto/crate.user.dto";
import { IPatchUserDto } from "../../routes/users/dto/patch.user.dto";
import { IPutUserDto } from "../../routes/users/dto/put.user.dto";

export interface CRUD {
    list(limit: number, page: number): Promise<Document[] | null>;
    create(resource: ICreateUserDto): Promise<string>;
    readById(id: string): Promise<Document | null>;
    putById(id: string, resource: IPutUserDto): Promise<Document | null>;
    patchById(id: string, resource: IPatchUserDto): Promise<Document | null>;
    deleteById(id: string): Promise<any>;
}