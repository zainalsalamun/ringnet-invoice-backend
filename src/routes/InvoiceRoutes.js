// src/routes/InvoiceRoute.js
// import express from "express";
// import {
//   getInvoices,
//   getInvoice,
//   addInvoice,
//   editInvoice,
//   removeInvoice,
// } from "../controllers/invoiceController.js";

// const router = express.Router();

// router.get("/", getInvoices);
// router.get("/:id", getInvoice);
// router.post("/", addInvoice);
// router.put("/:id", editInvoice);
// router.delete("/:id", removeInvoice);

// export default router;


// src/routes/invoiceRoutes.js
import express from "express";
import {
  getInvoices,
  getInvoice,
  addInvoice,
  editInvoice,
  removeInvoice,
} from "../controllers/invoiceController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Semua route invoice sekarang wajib token valid
router.get("/", verifyToken, getInvoices);
router.get("/:id", verifyToken, getInvoice);
router.post("/", verifyToken, addInvoice);
router.put("/:id", verifyToken, editInvoice);
router.delete("/:id", verifyToken, removeInvoice);

export default router;
