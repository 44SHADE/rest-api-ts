import mongooseService from "../common/services/mongoose.service";

const Schema = mongooseService.getMongoose().Schema;

const UserSchema = new Schema(
  {
    _id: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true, select: false },
    email: { type: String, require: true },
    permissionFlags: Number,
  },
  {
    timestamps: true,
    id: false,
  }
);

const User = mongooseService.getMongoose().model("User", UserSchema);

export default User;