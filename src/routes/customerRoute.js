import express from "express";
import {
  getCustomers,
  getCustomer,
  addCustomer,
  editCustomer,
  removeCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.post("/", addCustomer);
router.put("/:id", editCustomer);
router.delete("/:id", removeCustomer);

export default router;
