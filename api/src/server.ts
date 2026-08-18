import express from 'express';
import { healthRoutes } from './presentation/routes/health.routes';
import { authRoutes } from './presentation/routes/auth.routes';
import { serviceRoutes } from './presentation/routes/service.routes';
import { businessHoursRoutes } from './presentation/routes/business-hours.routes';
import { appointmentRoutes } from './presentation/routes/appointment.routes';

const app = express();
const PORT = 3333;

app.use(express.json());
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/services", serviceRoutes);
app.use("/business-hours", businessHoursRoutes);
app.use("/appointments", appointmentRoutes);

app.listen(PORT,() => {
    console.log(`API rodando em http://localhost:${PORT}`)
})