import { Schema, model } from "mongoose";
import IUser from "../routes/users/dto/user.dto";

const UserSchema: Schema = new Schema({
    username: String,
    password: String,
}, {
    timestamps: true
});

const User = model<IUser>("User", UserSchema);

export default User;