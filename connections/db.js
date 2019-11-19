import mongoose from "mongoose";
import config from "../config";
import chalk from "chalk";
//连接数据库
const options = {
  useNewUrlParser: true,
  autoIndex: false,
  reconnectTries: 30,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  keepAlive: true
};
mongoose.connect(config.url, options);
const db = mongoose.connection;

db.once("open", () => {
  console.log(chalk.green("连接数据库成功..."));
});

db.on("error", error => {
  console.error(chalk.red("Error in MongoDb connection: " + error));
  mongoose.disconnect();
});

db.on("close", () => {
  console.log(chalk.red("数据库断开，重新连接数据库..."));
  mongoose.connect(config.url, options);
});

export default db;
