import mongoose from "mongoose";
import debug from "debug";
import { configDotenv } from "dotenv";

configDotenv();
const log: debug.IDebugger = debug("app:mongoose-service");

class MongooseService {
  private url = String(process.env.MONGO_DB);

  constructor() {
    this.MongooseConnect();
  }

  getMongoose() {
    return mongoose;
  }

  MongooseConnect() {
    log("Mongoose connecting....");
    mongoose
      .connect(this.url)
      .then(() => {
        log("Mongoose is connected");
      })
      .catch((error) => {
        log(`Mongoose connection failed!`, error);
      });
  }
}

export default new MongooseService();