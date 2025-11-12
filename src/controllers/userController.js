// // src/controllers/userController.js
// import bcrypt from "bcryptjs";
// import { pool } from "../config/db.js";

// //Ambil semua user
// export const getUsers = async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT id, username, role, created_at FROM users ORDER BY created_at DESC"
//     );
//     res.json({ success: true, data: result.rows });
//   } catch (err) {
//     console.error("Gagal ambil user:", err);
//     res.status(500).json({ success: false, message: "Gagal memuat user" });
//   }
// };

// //Tambah user baru
// export const addUser = async (req, res) => {
//   try {
//     const { username, password, role } = req.body;

//     if (!username || !password || !role) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Semua field wajib diisi" });
//     }

//     const existing = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
//     if (existing.rows.length > 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Username sudah digunakan" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       `INSERT INTO users (id, username, password_hash, role)
//        VALUES (gen_random_uuid(), $1, $2, $3)
//        RETURNING id, username, role`,
//       [username, hashedPassword, role]
//     );

//     res.status(201).json({ success: true, message: "User berhasil dibuat", data: result.rows[0] });
//   } catch (err) {
//     console.error(" Gagal tambah user:", err);
//     res.status(500).json({ success: false, message: "Gagal menambah user" });
//   }
// };

// // Edit user
// export const editUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { username, password, role } = req.body;

//     if (!id) return res.status(400).json({ success: false, message: "ID tidak valid" });

//     if (password) {
//       const hashed = await bcrypt.hash(password, 10);
//       await pool.query(
//         "UPDATE users SET username=$1, password_hash=$2, role=$3 WHERE id=$4",
//         [username, hashed, role, id]
//       );
//     } else {
//       await pool.query("UPDATE users SET username=$1, role=$2 WHERE id=$3", [
//         username,
//         role,
//         id,
//       ]);
//     }

//     res.json({ success: true, message: "User berhasil diperbarui" });
//   } catch (err) {
//     console.error(" Gagal edit user:", err);
//     res.status(500).json({ success: false, message: "Gagal update user" });
//   }
// };

// // Hapus user
// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query("DELETE FROM users WHERE id=$1", [id]);
//     res.json({ success: true, message: "User berhasil dihapus" });
//   } catch (err) {
//     console.error(" Gagal hapus user:", err);
//     res.status(500).json({ success: false, message: "Gagal menghapus user" });
//   }
// };

// // ✅ UPDATE PASSWORD (admin reset / user ganti sendiri)
// export const updatePassword = async (req, res) => {
//   const { id } = req.params;
//   const { old_password, new_password } = req.body;

//   try {
//     // Cek user ada atau tidak
//     const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//     if (result.rowCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User tidak ditemukan",
//       });
//     }

//     const user = result.rows[0];

//     // Jika user sendiri yang ubah password (bukan admin)
//     if (old_password) {
//       const isMatch = await bcrypt.compare(old_password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({
//           success: false,
//           message: "Password lama salah",
//         });
//       }
//     }

//     // Hash password baru
//     const hashedPassword = await bcrypt.hash(new_password, 10);

//     // Update ke database
//     await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
//       hashedPassword,
//       id,
//     ]);

//     return res.json({
//       success: true,
//       message: "Password berhasil diubah",
//     });
//   } catch (error) {
//     console.error("Error updatePassword:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Terjadi kesalahan server saat ubah password",
//     });
//   }
// };


import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";

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

    res
      .status(201)
      .json({ success: true, message: "User berhasil dibuat", data: result.rows[0] });
  } catch (err) {
    console.error("Gagal tambah user:", err);
    res.status(500).json({ success: false, message: "Gagal menambah user" });
  }
};

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
    console.error("Gagal edit user:", err);
    res.status(500).json({ success: false, message: "Gagal update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ success: true, message: "User berhasil dihapus" });
  } catch (err) {
    console.error("Gagal hapus user:", err);
    res.status(500).json({ success: false, message: "Gagal menghapus user" });
  }
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { old_password, new_password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    const user = result.rows[0];

    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: "Tidak diizinkan mengubah password user lain",
      });
    }

    if (req.user.role !== "admin" && old_password) {
      const isMatch = await bcrypt.compare(old_password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Password lama salah",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      hashedPassword,
      id,
    ]);

    return res.json({
      success: true,
      message: "Password berhasil diubah",
    });
  } catch (error) {
    console.error("Error updatePassword:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server saat ubah password",
    });
  }
};
