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

