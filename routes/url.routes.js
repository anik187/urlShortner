import {Router} from "express";
import {
    createShortUrl,
    deleteShortUrl,
    getAllShortUrls,
    updateLongUrlByShortCode
} from "../controllers/url.controller.js";
import {ensureAuthenticated} from "../middlewares/auth.middleware.js";

const urlRouter = Router();
urlRouter.route("/createShortCode").post(ensureAuthenticated,createShortUrl)
urlRouter.route("/getAllShortCodes").get(ensureAuthenticated,getAllShortUrls)
urlRouter.route("/updateLongUrl").post(ensureAuthenticated,updateLongUrlByShortCode)
urlRouter.route("/deleteShortCode/:shortCode").delete(ensureAuthenticated,deleteShortUrl)
export default urlRouter;