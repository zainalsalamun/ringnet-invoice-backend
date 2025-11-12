import express from "express";
import {
  getInvoices,
  getInvoice,
  addInvoice,
  editInvoice,
  removeInvoice,
  uploadProof,
  getInvoiceStats
} from "../controllers/invoiceController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { uploadInvoiceProof } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getInvoices);
router.get("/:id", verifyToken, getInvoice);
router.post("/", verifyToken, addInvoice);
router.put("/:id", verifyToken, editInvoice);
router.delete("/:id", verifyToken, removeInvoice);
router.get("/stats/monthly", getInvoiceStats);

router.put(
  "/:id/upload",
  verifyToken,
  uploadInvoiceProof.single("bukti_transfer"),
  uploadProof
);

export default router;
