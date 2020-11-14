import {Router} from "express";
import multer from "multer";

import AuthMiddleware from "./middleware/AuthMiddleware";
import MulterConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessiconController";
import RecipientsController from "./app/controllers/RecipientsController";
import AvatarController from "./app/controllers/AvatarController";
import DeliveryManController from "./app/controllers/DeliveryManController";

const route = Router();
const upload = multer({storage: MulterConfig});

route.get("/createuser", UserController.create);
route.post("/session", SessionController.create);

route.use(AuthMiddleware);

route.post("/recipient", RecipientsController.create);
route.put("/recipient/:id", RecipientsController.update);

route.post("/avatar", upload.single("avatar"), AvatarController.create);

route.post("/deliveryman", DeliveryManController.create);
route.get("/deliveryman", DeliveryManController.index);
route.put("/deliveryman/:id", DeliveryManController.update);
route.delete("/deliveryman/:id", DeliveryManController.delete);

export default route;