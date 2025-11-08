import { pool } from "../config/db.js";

export const getCustomers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY created_at DESC");
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addCustomer = async (req, res) => {
  try {
    const { nama, alamat, nomor_wa, paket, aktif } = req.body;
    const result = await pool.query(
      `INSERT INTO customers (nama, alamat, nomor_wa, paket, aktif)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nama, alamat, nomor_wa, paket, aktif ?? true]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const editCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, alamat, nomor_wa, paket, aktif } = req.body;
    const result = await pool.query(
      `UPDATE customers
       SET nama=$1, alamat=$2, nomor_wa=$3, paket=$4, aktif=$5, updated_at=NOW()
       WHERE id=$6
       RETURNING *`,
      [nama, alamat, nomor_wa, paket, aktif, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM customers WHERE id=$1", [id]);
    res.json({ success: true, message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
