import { Router } from "express";
import { HealthController } from "../controllers/health.controller";

const healthRoutes = Router();
const healthController = new HealthController();

healthRoutes.get("/", (req, res) => healthController.check(req, res))

export { healthRoutes };