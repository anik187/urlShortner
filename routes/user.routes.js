import {Router} from "express";
import {createUser, loginUser, logOutUser} from "../controllers/user.controller.js";
import {ensureAuthenticated} from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/signup").post(createUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").get(ensureAuthenticated,logOutUser)

export default userRouter;