// src/routes/InvoiceRoute.js
import express from "express";
import {
  getInvoices,
  getInvoice,
  addInvoice,
  editInvoice,
  removeInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.post("/", addInvoice);
router.put("/:id", editInvoice);
router.delete("/:id", removeInvoice);

export default router;
