import {Router} from "express";
import multer from "multer";

import AuthMiddleware from "./middleware/AuthMiddleware";
import MulterConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessiconController";
import RecipientsController from "./app/controllers/RecipientsController";
import AvatarController from "./app/controllers/AvatarController";
import DeliveryManController from "./app/controllers/DeliveryManController";
import SignatureController from "./app/controllers/SignatureController";
import OrderController from "./app/controllers/OrderController";
import DeliveryWaitingController from "./app/controllers/DeliveryWaitingController";
import DeliveryDoneController from "./app/controllers/DeliveryDoneController";
import StartDateController from "./app/controllers/StartDateController";
import EndDateController from "./app/controllers/EndDateController";
import ProblemController from "./app/controllers/ProblemController";
import ProblemIndexController from "./app/controllers/ProblemIndexController";
import CancelController from "./app/controllers/CancelController";

const route = Router();
const upload = multer({storage: MulterConfig});

route.get("/createuser", UserController.create);
route.post("/session", SessionController.create);

route.get("/deliveryman/:id/deliveries/waiting", DeliveryWaitingController.index);
route.get("/deliveryman/:id/deliveries/done", DeliveryDoneController.index);

route.post("/deliveryman/:deliverymanid/order/:orderid/start_date", StartDateController.create);
route.post("/deliveryman/:deliverymanid/order/:orderid/end_date", EndDateController.create);

route.post("/order/:id/problems", ProblemController.create);
route.get("/order/:id/problems", ProblemController.index);

route.post("/signature", upload.single("signature"), SignatureController.create);

route.use(AuthMiddleware);

route.post("/recipient", RecipientsController.create);
route.put("/recipient/:id", RecipientsController.update);

route.post("/avatar", upload.single("avatar"), AvatarController.create);

route.post("/deliveryman", DeliveryManController.create);
route.get("/deliveryman", DeliveryManController.index);
route.put("/deliveryman/:id", DeliveryManController.update);
route.delete("/deliveryman/:id", DeliveryManController.delete);

route.post("/order", OrderController.create);
route.get("/order", OrderController.index);
route.put("/order/:id", OrderController.update);
route.delete("/order/:id", OrderController.delete);

route.get("/order/problems", ProblemIndexController.index);

route.delete("/problem/:id/cancel-delivery", CancelController.create);

export default route;