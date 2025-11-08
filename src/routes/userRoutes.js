// src/routes/userRoutes.js
import express from "express";
import {
  getUsers,
  addUser,
  editUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

//Semua route ini hanya untuk admin
router.get("/", verifyToken, authorizeRoles("admin"), getUsers);
router.post("/", verifyToken, authorizeRoles("admin"), addUser);
router.put("/:id", verifyToken, authorizeRoles("admin"), editUser);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteUser);

export default router;
