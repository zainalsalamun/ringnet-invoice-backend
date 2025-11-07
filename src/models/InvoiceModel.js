// // src/models/InvoiceModel.js
// import { pool } from "../config/db.js";

// // ✅ Ambil semua invoice
// export const getAllInvoices = async () => {
//   const result = await pool.query("SELECT * FROM invoices ORDER BY tanggal_invoice DESC");
//   return result.rows;
// };

// // ✅ Ambil invoice berdasarkan ID (UUID)
// export const getInvoiceById = async (id) => {
//   const result = await pool.query("SELECT * FROM invoices WHERE id = $1", [id]);
//   return result.rows[0];
// };

// // ✅ Buat invoice baru
// export const createInvoice = async (data) => {
//   const {
//     nomor_invoice,
//     nama_pelanggan,
//     alamat,
//     layanan,
//     harga_paket,
//     ppn,
//     total,
//     periode,
//     status_pembayaran,
//     tanggal_invoice,
//     tanggal_jatuh_tempo,
//   } = data;

//   const result = await pool.query(
//     `INSERT INTO invoices (
//       nomor_invoice,
//       nama_pelanggan,
//       alamat,
//       layanan,
//       harga_paket,
//       ppn,
//       total,
//       periode,
//       status_pembayaran,
//       tanggal_invoice,
//       tanggal_jatuh_tempo
//     )
//     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
//     RETURNING *`,
//     [
//       nomor_invoice,
//       nama_pelanggan,
//       alamat,
//       layanan,
//       harga_paket,
//       ppn,
//       total,
//       periode,
//       status_pembayaran,
//       tanggal_invoice,
//       tanggal_jatuh_tempo,
//     ]
//   );

//   return result.rows[0];
// };

// // ✅ Update status pembayaran (atau field lain jika perlu)
// export const updateInvoice = async (id, data) => {
//   const {
//     nama_pelanggan,
//     alamat,
//     layanan,
//     harga_paket,
//     ppn,
//     total,
//     periode,
//     status_pembayaran,
//     tanggal_jatuh_tempo,
//   } = data;

//   const result = await pool.query(
//     `UPDATE invoices SET
//       nama_pelanggan = $1,
//       alamat = $2,
//       layanan = $3,
//       harga_paket = $4,
//       ppn = $5,
//       total = $6,
//       periode = $7,
//       status_pembayaran = $8,
//       tanggal_jatuh_tempo = $9
//     WHERE id = $10
//     RETURNING *`,
//     [
//       nama_pelanggan,
//       alamat,
//       layanan,
//       harga_paket,
//       ppn,
//       total,
//       periode,
//       status_pembayaran,
//       tanggal_jatuh_tempo,
//       id,
//     ]
//   );

//   return result.rows[0];
// };

// // ✅ Hapus invoice
// export const deleteInvoice = async (id) => {
//   await pool.query("DELETE FROM invoices WHERE id = $1", [id]);
//   return { message: "Invoice deleted successfully" };
// };


import { pool } from "../config/db.js";
import dayjs from "dayjs";

export const getAllInvoices = async () => {
  const result = await pool.query("SELECT * FROM invoices ORDER BY tanggal_invoice DESC");
  return result.rows;
};

export const getInvoiceById = async (id) => {
  const result = await pool.query("SELECT * FROM invoices WHERE id = $1", [id]);
  return result.rows[0];
};

export const createInvoice = async (data) => {
  const {
    nama_pelanggan,
    alamat,
    layanan,
    harga_paket,
    ppn,
    total,
    periode,
    status_pembayaran,
    tanggal_invoice,
    tanggal_jatuh_tempo,
  } = data;

  const nomor_invoice = `INV-${dayjs().format("YYYYMMDD-HHmmss")}`;

  const result = await pool.query(
    `INSERT INTO invoices (
      id, nomor_invoice, nama_pelanggan, alamat, layanan, harga_paket,
      ppn, total, periode, status_pembayaran, tanggal_invoice, tanggal_jatuh_tempo
    )
    VALUES (gen_random_uuid(), $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *`,
    [
      nomor_invoice,
      nama_pelanggan,
      alamat,
      layanan,
      harga_paket,
      ppn,
      total,
      periode,
      status_pembayaran,
      tanggal_invoice,
      tanggal_jatuh_tempo,
    ]
  );

  return result.rows[0];
};

export const updateInvoice = async (id, data) => {
  const { status_pembayaran } = data;
  const result = await pool.query(
    "UPDATE invoices SET status_pembayaran = $1 WHERE id = $2 RETURNING *",
    [status_pembayaran, id]
  );
  return result.rows[0];
};

export const deleteInvoice = async (id) => {
  await pool.query("DELETE FROM invoices WHERE id = $1", [id]);
  return { message: "Invoice deleted successfully" };
};

