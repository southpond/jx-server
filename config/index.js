export default {
  port: 9000,
  url: "mongodb://localhost:27017/ele_db",
  session: {
    name: "SID",
    secret: "SID",
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  }
};
