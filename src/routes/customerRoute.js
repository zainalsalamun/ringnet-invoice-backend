// import express from "express";
// import {
//   getCustomers,
//   getCustomer,
//   addCustomer,
//   editCustomer,
//   removeCustomer,
// } from "../controllers/customerController.js";

// const router = express.Router();

// router.get("/", getCustomers);
// router.get("/:id", getCustomer);
// router.post("/", addCustomer);
// router.put("/:id", editCustomer);
// router.delete("/:id", removeCustomer);

// export default router;


// src/routes/customerRoutes.js
import express from "express";
import {
  getCustomers,
  getCustomer,
  addCustomer,
  editCustomer,
  removeCustomer,
} from "../controllers/customerController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin", "kasir", "teknisi"),
  getCustomers
);

router.get(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "kasir", "teknisi"),
  getCustomer
);

router.post("/", verifyToken, authorizeRoles("admin"), addCustomer);

router.put("/:id", verifyToken, authorizeRoles("admin", "kasir"), editCustomer);

router.delete("/:id", verifyToken, authorizeRoles("admin"), removeCustomer);

export default router;
