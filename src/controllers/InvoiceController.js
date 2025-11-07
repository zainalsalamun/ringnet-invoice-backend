// // src/controllers/InvoiceController.js
// import {
//     getAllInvoices,
//     getInvoiceById,
//     createInvoice,
//     updateInvoice,
//     deleteInvoice,
//   } from "../models/InvoiceModel.js";
  
//   export const getInvoices = async (req, res) => {
//     try {
//       const data = await getAllInvoices();
//       res.json(data);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };
  
//   export const getInvoice = async (req, res) => {
//     try {
//       const data = await getInvoiceById(req.params.id);
//       if (!data) return res.status(404).json({ message: "Invoice not found" });
//       res.json(data);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };
  
//   export const addInvoice = async (req, res) => {
//     try {
//       const newInvoice = await createInvoice(req.body);
//       res.status(201).json(newInvoice);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };
  
//   export const editInvoice = async (req, res) => {
//     try {
//       const updated = await updateInvoice(req.params.id, req.body);
//       res.json(updated);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };
  
//   export const removeInvoice = async (req, res) => {
//     try {
//       const result = await deleteInvoice(req.params.id);
//       res.json(result);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };


import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../models/InvoiceModel.js";

// GET semua invoice
export const getInvoices = async (req, res) => {
  try {
    const data = await getAllInvoices();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Error getInvoices:", error);
    res.status(500).json({ success: false, message: "Gagal ambil data" });
  }
};

// GET 1 invoice by id
export const getInvoice = async (req, res) => {
  try {
    const data = await getInvoiceById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, message: "Invoice tidak ditemukan" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Error getInvoice:", error);
    res.status(500).json({ success: false, message: "Gagal ambil detail" });
  }
};

// POST tambah invoice
export const addInvoice = async (req, res) => {
  try {
    const data = await createInvoice(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error("❌ Error addInvoice:", error);
    res.status(500).json({ success: false, message: "Gagal tambah invoice" });
  }
};

// PUT edit invoice
export const editInvoice = async (req, res) => {
  try {
    const data = await updateInvoice(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Error editInvoice:", error);
    res.status(500).json({ success: false, message: "Gagal update invoice" });
  }
};

// DELETE invoice
export const removeInvoice = async (req, res) => {
  try {
    await deleteInvoice(req.params.id);
    res.status(200).json({ success: true, message: "Invoice berhasil dihapus" });
  } catch (error) {
    console.error("❌ Error removeInvoice:", error);
    res.status(500).json({ success: false, message: "Gagal hapus invoice" });
  }
};

  