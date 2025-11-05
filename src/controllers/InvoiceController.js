// src/controllers/InvoiceController.js
import {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  } from "../models/InvoiceModel.js";
  
  export const getInvoices = async (req, res) => {
    try {
      const data = await getAllInvoices();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const getInvoice = async (req, res) => {
    try {
      const data = await getInvoiceById(req.params.id);
      if (!data) return res.status(404).json({ message: "Invoice not found" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const addInvoice = async (req, res) => {
    try {
      const newInvoice = await createInvoice(req.body);
      res.status(201).json(newInvoice);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const editInvoice = async (req, res) => {
    try {
      const updated = await updateInvoice(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const removeInvoice = async (req, res) => {
    try {
      const result = await deleteInvoice(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  