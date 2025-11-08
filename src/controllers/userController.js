// src/controllers/userController.js
import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";

//Ambil semua user
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, role, created_at FROM users ORDER BY created_at DESC"
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Gagal ambil user:", err);
    res.status(500).json({ success: false, message: "Gagal memuat user" });
  }
};

//Tambah user baru
export const addUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Semua field wajib diisi" });
    }

    const existing = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Username sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (id, username, password_hash, role)
       VALUES (gen_random_uuid(), $1, $2, $3)
       RETURNING id, username, role`,
      [username, hashedPassword, role]
    );

    res.status(201).json({ success: true, message: "User berhasil dibuat", data: result.rows[0] });
  } catch (err) {
    console.error(" Gagal tambah user:", err);
    res.status(500).json({ success: false, message: "Gagal menambah user" });
  }
};

// Edit user
export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;

    if (!id) return res.status(400).json({ success: false, message: "ID tidak valid" });

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      await pool.query(
        "UPDATE users SET username=$1, password_hash=$2, role=$3 WHERE id=$4",
        [username, hashed, role, id]
      );
    } else {
      await pool.query("UPDATE users SET username=$1, role=$2 WHERE id=$3", [
        username,
        role,
        id,
      ]);
    }

    res.json({ success: true, message: "User berhasil diperbarui" });
  } catch (err) {
    console.error(" Gagal edit user:", err);
    res.status(500).json({ success: false, message: "Gagal update user" });
  }
};

// Hapus user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ success: true, message: "User berhasil dihapus" });
  } catch (err) {
    console.error(" Gagal hapus user:", err);
    res.status(500).json({ success: false, message: "Gagal menghapus user" });
  }
};
