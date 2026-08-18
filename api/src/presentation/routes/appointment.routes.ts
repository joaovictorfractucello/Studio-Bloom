import { Router } from "express"
import { AppointmentController } from "../controllers/appointment.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { AuthRequest } from "../../shared/types/auth-request"
import { requireRole } from "../middlewares/require-role.middleware"

const appointmentRoutes = Router()
const appointmentController = new AppointmentController()

appointmentRoutes.get("/slots", (req, res) =>
    appointmentController.listSlots(req, res)
)

appointmentRoutes.get(
    "/mine",
    (req, res, next) =>
        authMiddleware(req as unknown as AuthRequest, res, next),
    (req, res) =>
        appointmentController.listMine(req as unknown as AuthRequest, res)
)

appointmentRoutes.get(
    "/",
    (req, res, next) =>
        authMiddleware(req as unknown as AuthRequest, res, next),
    (req, res, next) =>
        requireRole("PROFESSIONAL", "ADMIN")(
            req as unknown as AuthRequest,
            res,
            next
        ),
    (req, res) =>
        appointmentController.listDay(req as unknown as AuthRequest, res)
)

appointmentRoutes.post(
    "/",
    (req, res, next) =>
        authMiddleware(req as unknown as AuthRequest, res, next),
    (req, res) =>
        appointmentController.create(req as unknown as AuthRequest, res)
)

appointmentRoutes.patch(
    "/:id/cancel",
    (req, res, next) =>
      authMiddleware(req as unknown as AuthRequest, res, next),
    (req, res) =>
      appointmentController.cancel(req as unknown as AuthRequest, res)
  )

export { appointmentRoutes }