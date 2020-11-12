import {Router} from "express";

import AuthMiddleware from "./middleware/AuthMiddleware";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessiconController";
import RecipientsController from "./app/controllers/RecipientsController";

const route = Router();

route.get("/createuser", UserController.create);
route.post("/session", SessionController.create);

route.use(AuthMiddleware);

route.post("/recipient", RecipientsController.create);
route.put("/recipient/:id", RecipientsController.update);

export default route;