import * as dotenv from "dotenv";

const Environment = () => {
  /** config the environment variable */
  dotenv.config();
  dotenv.config({ path:process.env.ENV==="production"?"../.env": "../../.env" });
};

export default Environment;
