import {Router} from "express";
import multer from "multer";

import AuthMiddleware from "./middleware/AuthMiddleware";
import MulterConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessiconController";
import RecipientsController from "./app/controllers/RecipientsController";
import AvatarController from "./app/controllers/AvatarController";

const route = Router();
const upload = multer({storage: MulterConfig});

route.get("/createuser", UserController.create);
route.post("/session", SessionController.create);

route.use(AuthMiddleware);

route.post("/recipient", RecipientsController.create);
route.put("/recipient/:id", RecipientsController.update);

route.post("/avatar", upload.single("avatar"),AvatarController.create);

export default route;