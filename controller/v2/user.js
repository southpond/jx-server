import AddressComponent from "../../prototype/addressComponent";
import formidable from "formidable";
import UserInfoModel from "../../models/v2/userInfo";
import UserModel from "../../models/v2/user";
import crypto from "crypto";
import moment from "moment";

class User extends AddressComponent {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.encryption = this.encryption.bind(this);
  }
  async login(req, res, next) {
    const cap = req.cookies.cap;
    const form = new formidable.IncomingForm();
    if (!cap) {
      console.log("验证码失效");
      res.send({
        status: 0,
        type: "ERROR_CAPTCHA",
        message: "验证码失效"
      });
      return;
    }
    form.parse(req, async (err, fields, files) => {
      const { username, password, captcha_code } = fields;
      try {
        if (!username) {
          if (!username) {
            throw new Error("用户名参数错误");
          } else if (!password) {
            throw new Error("密码参数错误");
          } else if (!captcha_code) {
            throw new Error("验证码参数错误");
          }
        }
      } catch (e) {
        console.log("登陆参数错误", err);
        res.send({
          status: 0,
          type: "ERROR_QUERY",
          message: err.message
        });
        return;
      }
      if (cap.toString() !== captcha_code.toString()) {
        res.send({
          status: 0,
          type: "ERROR_CAPTCHA",
          message: "验证码不正确"
        });
        return;
      }
      const newpassword = this.encryption(password);
      try {
        const user = await UserModel.findOne({ username });
        if (!user) {
          const user_id = await this.getId("user_id");
          const cityInfo = await this.guessPosition(req);
          const registe_time = moment().format("YYYY-MM-DD HH:mm");
          const newUser = { username, password: newpassword, user_id };
          const newUserInfo = {
            username,
            user_id,
            id: user_id,
            city: cityInfo.city,
            registe_time
          };
          const userinfo = await UserInfoModel.create(newUserInfo);
          UserModel.create(newUser);
          req.session.user_id = user_id;
          res.send(userinfo);
        } else if (user.password.toString() !== newpassword.toString()) {
          console.log("用户登录密码错误");
          res.send({
            status: 0,
            type: "ERROR_PASSWORD",
            message: "密码错误"
          });
          return;
        } else {
          req.session.user_id = user.user_id;
          const userinfo = await UserInfoModel.findOne(
            { user_id: user.user_id },
            "-_id"
          );
          res.send(userinfo);
        }
      } catch (e) {
        console.log("用户登陆失败", err);
        res.send({
          status: 0,
          type: "SAVE_USER_FAILED",
          message: "登陆失败"
        });
      }
    });
  }
  encryption(password) {
    const newpassword = this.Md5(
      this.Md5(password).substr(2, 7) + this.Md5(password)
    );
    return newpassword;
  }
  Md5(password) {
    const md5 = crypto.createHash("md5");
    return md5.update(password).digest("base64");
  }
}

export default new User();
