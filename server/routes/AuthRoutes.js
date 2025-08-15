import { Router } from "express";
import { getUserInfo, login, signup } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middelware/AuthMiddelware.js";

const routes = Router();

routes.post('/signup',signup);
routes.post('/login', login);
routes.get('/user-info',verifyToken, getUserInfo)
export default routes;