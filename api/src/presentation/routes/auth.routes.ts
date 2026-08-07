import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { AuthRequest } from "../../shared/types/auth-request"

const authRoutes = Router()
const authController = new AuthController()

authRoutes.post("/register", (req, res) => authController.register(req, res))
authRoutes.post("/login", (req, res) => authController.login(req, res))
authRoutes.get(
    "/me",
    (req, res, next) => authMiddleware(req as AuthRequest, res, next),
    (req, res) => authController.me(req as AuthRequest, res)
)
authRoutes.post("/refresh", (req, res) => authController.refresh(req, res))


export { authRoutes }