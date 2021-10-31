import * as express from "express";

import AuthCtrl from "../controllers/auth";

export const authRoute = express.Router();
authRoute.post("/login", AuthCtrl.login);
authRoute.post("/signup", AuthCtrl.signup);