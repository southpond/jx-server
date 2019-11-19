import express from "express";
import router from "./routes";
import config from "./config";
import db from "./connections/db";
import chalk from "chalk";
import session from "express-session";
import connectMongo from "connect-mongo";
import cookieParser from "cookie-parser";

const app = express();
//解决跨域等
app.all("*", (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || "*";
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", "Express");
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(
  session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({
      url: config.url
    })
  })
);

router(app);

app.use(cookieParser());
app.use(express.static("public"));

app.listen(config.port, function() {
  console.log(chalk.green(`成功监听端口：${config.port}`));
});
