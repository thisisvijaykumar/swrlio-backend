import * as JWT from "jsonwebtoken";
const validate = async (token: string) => {
  try {
    const jwtDecoded = await JWT.verify(token, process.env.JWT_SALT);
    const userId = jwtDecoded["data"]["id"];
    return userId;

  } catch (error) {
      return false;
  }
};

export default validate;
