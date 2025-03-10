import { Router } from "express";
import { getUserInfo, signup } from "../controllers/AuthController.js";
import { login } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";


const authRoutes = Router();

authRoutes.post("/signup",signup);

authRoutes.post("/login",login);

authRoutes.get('/userInfo',verifyToken ,getUserInfo)

export default authRoutes;





