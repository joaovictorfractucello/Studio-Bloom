import { Router } from "express"
import { AppointmentController } from "../controllers/appointment.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { AuthRequest } from "../../shared/types/auth-request"

const appointmentRoutes = Router()
const appointmentController = new AppointmentController()

appointmentRoutes.get("/slots", (req, res) => 
    appointmentController.listSlots(req, res)
)

appointmentRoutes.post(
    "/",
    (req, res, next) =>
      authMiddleware(req as unknown as AuthRequest, res, next),
    (req, res) =>
      appointmentController.create(req as unknown as AuthRequest, res)
  )

export { appointmentRoutes }