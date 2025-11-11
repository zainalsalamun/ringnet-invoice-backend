import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "src/uploads/invoices";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const uploadInvoiceProof = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // Maks 3MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Format file tidak diizinkan (hanya JPG/PNG)"));
    }
    cb(null, true);
  },
});
