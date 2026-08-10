import { Router } from "express"
import { BusinessHoursController } from "../controllers/business-hours.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { requireRole } from "../middlewares/require-role.middleware"
import { AuthRequest } from "../../shared/types/auth-request"

const businessHoursRoutes = Router()
const businessHoursController = new BusinessHoursController()

businessHoursRoutes.get("/", (req, res) =>
  businessHoursController.list(req, res)
)

businessHoursRoutes.put(
  "/",
  (req, res, next) =>
    authMiddleware(req as unknown as AuthRequest, res, next),
  (req, res, next) =>
    requireRole("ADMIN")(req as unknown as AuthRequest, res, next),
  (req, res) =>
    businessHoursController.upsert(req as unknown as AuthRequest, res)
)

export { businessHoursRoutes }