import * as jwt from "jsonwebtoken";
import * as md5 from "md5";
import User from "../models/user";

interface Input {
  email: string;
  password: string;
}

class AuthSerivce {
  static async login(data: Input) {
    try {
      let token: string | undefined;
      data.password = md5(data.password + process.env.HASH_SALT);
      const user = await User.findOneOrFail(data);
      if (user && user.id) {
        token = jwt.sign(
          { expiresIn: "5 days", data: { id: user.id } },
          process.env.JWT_SALT
        );
        return {
          token: token,
          user: {
            id: user.id,
            name: user.name,
            profile_photo: user.profile_photo,
          },
        };
      }
    } catch (error) {
      console.log(error, "error service ");
      throw error;
    }
  }
  static async signup(data: any) {
    try {
      let token: string | undefined;
      data.password = md5(data.password + process.env.HASH_SALT);
      const user = await User.save(data);
      if (user?.password) delete user.password;
      if (user && user.id) {
        token = jwt.sign(
          { expiresIn: "5 days", data: { id: user.id } },
          process.env.JWT_SALT
        );
        return {
          token: token,
          user: {
            id: user.id,
            name: user.name,
            profile_photo: user.profile_photo,
          },
        };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthSerivce;
