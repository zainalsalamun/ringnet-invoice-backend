// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import customerRoute from "./routes/customerRoute.js"; 
import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/invoices", invoiceRoutes);
app.use("/api/customers", customerRoute);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
    res.send("✅ Ringnet Invoice API Running");
  });


export default app;
