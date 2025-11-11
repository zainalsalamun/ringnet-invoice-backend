import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import customerRoute from "./routes/customerRoute.js"; 
import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.get("/", (req, res) => {
  res.send("✅ Ringnet Invoice API Running");
});

app.use("/api/invoices", invoiceRoutes);
app.use("/api/customers", customerRoute);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;

