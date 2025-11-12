// import {
//   getAllInvoices,
//   getInvoiceById,
//   createInvoice,
//   updateInvoice,
//   deleteInvoice,
// } from "../models/InvoiceModel.js";
// import { pool } from "../config/db.js";

// export const getInvoices = async (req, res) => {
//   try {
//     const data = await getAllInvoices();
//     res.status(200).json({ success: true, data });
//   } catch (error) {
//     console.error("Error getInvoices:", error);
//     res.status(500).json({ success: false, message: "Gagal ambil data" });
//   }
// };

// // GET 1 invoice by id
// export const getInvoice = async (req, res) => {
//   try {
//     const data = await getInvoiceById(req.params.id);
//     if (!data)
//       return res.status(404).json({ success: false, message: "Invoice tidak ditemukan" });
//     res.status(200).json({ success: true, data });
//   } catch (error) {
//     console.error("Error getInvoice:", error);
//     res.status(500).json({ success: false, message: "Gagal ambil detail" });
//   }
// };

// // POST tambah invoice
// export const addInvoice = async (req, res) => {
//   try {
//     const data = await createInvoice(req.body);
//     res.status(201).json({ success: true, data });
//   } catch (error) {
//     console.error("Error addInvoice:", error);
//     res.status(500).json({ success: false, message: "Gagal tambah invoice" });
//   }
// };

// // PUT edit invoice
// export const editInvoice = async (req, res) => {
//   try {
//     const data = await updateInvoice(req.params.id, req.body);
//     res.status(200).json({ success: true, data });
//   } catch (error) {
//     console.error("Error editInvoice:", error);
//     res.status(500).json({ success: false, message: "Gagal update invoice" });
//   }
// };

// // DELETE invoice
// export const removeInvoice = async (req, res) => {
//   try {
//     await deleteInvoice(req.params.id);
//     res.status(200).json({ success: true, message: "Invoice berhasil dihapus" });
//   } catch (error) {
//     console.error("Error removeInvoice:", error);
//     res.status(500).json({ success: false, message: "Gagal hapus invoice" });
//   }
// };


// //Upload bukti transfer + update tanggal pembayaran
// export const uploadProof = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ success: false, message: "File bukti tidak ditemukan" });
//     }

//     const buktiPath = `/uploads/invoices/${req.file.filename}`;
//     const tanggalPembayaran = new Date(); // ← tanggal saat upload

//     // Update DB
//     const result = await pool.query(
//       `UPDATE invoices 
//        SET bukti_transfer = $1, 
//            status_pembayaran = 'Lunas',
//            tanggal_pembayaran = $2
//        WHERE id = $3
//        RETURNING *`,
//       [buktiPath, tanggalPembayaran, id]
//     );

//     if (result.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invoice tidak ditemukan" });
//     }

//     res.json({
//       success: true,
//       message: "Bukti pembayaran berhasil diupload",
//       data: result.rows[0],
//     });
//   } catch (err) {
//     console.error("Error upload bukti:", err);
//     res.status(500).json({ success: false, message: "Gagal upload bukti" });
//   }
// };


import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../models/InvoiceModel.js";
import { pool } from "../config/db.js";
import path from "path";

// GET semua invoice
export const getInvoices = async (req, res) => {
  try {
    const data = await getAllInvoices();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error getInvoices:", error);
    res.status(500).json({ success: false, message: "Gagal ambil data" });
  }
};

// GET invoice by ID
export const getInvoice = async (req, res) => {
  try {
    const data = await getInvoiceById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, message: "Invoice tidak ditemukan" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error getInvoice:", error);
    res.status(500).json({ success: false, message: "Gagal ambil detail" });
  }
};

// POST tambah invoice
export const addInvoice = async (req, res) => {
  try {
    const data = await createInvoice(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error("Error addInvoice:", error);
    res.status(500).json({ success: false, message: "Gagal tambah invoice" });
  }
};

// PUT edit invoice
export const editInvoice = async (req, res) => {
  try {
    const data = await updateInvoice(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error editInvoice:", error);
    res.status(500).json({ success: false, message: "Gagal update invoice" });
  }
};

// DELETE invoice
export const removeInvoice = async (req, res) => {
  try {
    await deleteInvoice(req.params.id);
    res.status(200).json({ success: true, message: "Invoice berhasil dihapus" });
  } catch (error) {
    console.error("Error removeInvoice:", error);
    res.status(500).json({ success: false, message: "Gagal hapus invoice" });
  }
};

export const uploadProof = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File bukti tidak ditemukan",
      });
    }

    const buktiPath = `/uploads/invoices/${req.file.filename}`;
    const tanggalPembayaran = new Date();

    // Cek invoice
    const checkInvoice = await pool.query(
      "SELECT id FROM invoices WHERE id = $1",
      [id]
    );
    if (checkInvoice.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice tidak ditemukan" });
    }

    // Update 
    const result = await pool.query(
      `UPDATE invoices 
       SET bukti_transfer = $1,
           status_pembayaran = 'Lunas',
           tanggal_pembayaran = $2
       WHERE id = $3
       RETURNING *`,
      [buktiPath, tanggalPembayaran, id]
    );

    res.status(200).json({
      success: true,
      message: "Bukti pembayaran berhasil diupload",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error uploadProof:", err);
    res.status(500).json({
      success: false,
      message: "Gagal upload bukti pembayaran",
    });
  }
};

// GET grafik bulanan
export const getInvoiceStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(tanggal_invoice, 'YYYY-MM') AS bulan,
        COUNT(*) AS total_invoice,
        SUM(CASE WHEN status_pembayaran = 'Lunas' THEN 1 ELSE 0 END) AS total_lunas,
        SUM(total) AS total_nominal
      FROM invoices
      GROUP BY 1
      ORDER BY 1 ASC
    `);

    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Error getInvoiceStats:", err);
    res.status(500).json({ success: false, message: "Gagal ambil statistik bulanan" });
  }
};

