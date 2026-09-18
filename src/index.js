import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes       from "./routes/user.routes.js";
import membershipRoutes from "./routes/membership.routes.js";
import productRoutes    from "./routes/product.routes.js";
import saleRoutes       from "./routes/sale.routes.js";
import dashboardRoutes  from "./routes/dashboard.routes.js";
import adminRoutes      from "./routes/admin.routes.js";
import uploadRoutes     from "./routes/upload.routes.js";
import accessRoutes     from "./routes/access.routes.js";
import settingsRoutes   from "./routes/settings.routes.js";
import cashRoutes       from "./routes/cash.routes.js";

import { authMiddleware } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ── Rutas públicas (sin autenticación) ──────────────────────
app.use("/api/admin",  adminRoutes);   // login / register admin
app.use("/api/access", accessRoutes);  // validación QR torniquete

// ── Rutas protegidas (requieren JWT de admin) ────────────────
app.use("/api/users",       authMiddleware, userRoutes);
app.use("/api/memberships", authMiddleware, membershipRoutes);
app.use("/api/products",    authMiddleware, productRoutes);
app.use("/api/sales",       authMiddleware, saleRoutes);
app.use("/api/dashboard",   authMiddleware, dashboardRoutes);
app.use("/api/upload",      authMiddleware, uploadRoutes);
app.use("/api/settings",    authMiddleware, settingsRoutes);
app.use("/api/cash",        authMiddleware, cashRoutes);

app.get("/", (_req, res) => {
  res.send("API Gym funcionando 🚀");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});