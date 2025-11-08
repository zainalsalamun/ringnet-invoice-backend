// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import customerRoute from "./routes/customerRoute.js"; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/invoices", invoiceRoutes);
app.use("/api/customers", customerRoute);

export default app;
