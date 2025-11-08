// src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js"; // 🧩 tambahkan ini
import { findUserByUsername } from "../models/UserModel.js";

// ✅ LOGIN USER (ADMIN / KASIR)
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Username dan password wajib diisi" });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "ringnet-secret",
      { expiresIn: "8h" }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ REGISTER USER BARU
export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validasi input
    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Semua field wajib diisi" });
    }

    // Cek apakah username sudah ada
    const existing = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Username sudah digunakan" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke DB
    const result = await pool.query(
      `INSERT INTO users (id, username, password_hash, role)
       VALUES (gen_random_uuid(), $1, $2, $3)
       RETURNING id, username, role`,
      [username, hashedPassword, role]
    );

    res.status(201).json({
      success: true,
      message: "User berhasil dibuat",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Error register:", err);
    res
      .status(500)
      .json({ success: false, message: "Gagal membuat user baru" });
  }
};
