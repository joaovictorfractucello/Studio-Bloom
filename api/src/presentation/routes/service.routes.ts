import { Router } from "express"
import { ServiceController } from "../controllers/service.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { requireRole } from "../middlewares/require-role.middleware"
import { AuthRequest } from "../../shared/types/auth-request"

const serviceRoutes = Router()
const serviceController = new ServiceController()

serviceRoutes.get("/", (req, res) => serviceController.list(req, res))

serviceRoutes.post(
  "/",
  (req, res, next) => authMiddleware(req as AuthRequest, res, next),
  (req, res, next) => requireRole("ADMIN")(req as AuthRequest, res, next),
  (req, res) => serviceController.create(req as AuthRequest, res)
)

serviceRoutes.patch(
    "/:id",
    (req, res, next) => authMiddleware(req as unknown as AuthRequest, res, next),
    (req, res, next) => requireRole("ADMIN")(req as unknown as AuthRequest, res, next),
    (req, res) => serviceController.update(req as unknown as AuthRequest, res)
  )

export { serviceRoutes }