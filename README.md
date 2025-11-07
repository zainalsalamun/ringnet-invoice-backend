💼 Ringnet Invoice Backend

Ringnet Invoice Backend adalah REST API berbasis Node.js + Express + PostgreSQL yang digunakan untuk mengelola data invoice pelanggan layanan internet (ISP).
API ini mendukung fitur CRUD, generate nomor invoice otomatis, serta format response yang terstruktur untuk integrasi frontend React.

🚀 Tech Stack

Runtime: Node.js (v18+)

Framework: Express.js

Database: PostgreSQL

ORM / Query: Native pg pool

Dev Tools: Nodemon, dotenv

Response Format: JSON { success, data, message }

📁 Project Structure
ringnet-invoice-backend/
├── src/
│   ├── config/
│   │   └── db.js              # Konfigurasi koneksi PostgreSQL
│   ├── controllers/
│   │   └── InvoiceController.js
│   ├── models/
│   │   └── InvoiceModel.js
│   ├── routes/
│   │   └── InvoiceRoute.js
│   ├── server.js              # Entry point Express app
│   └── utils/
│       └── index.js (optional)
├── .env
├── package.json
└── README.md

⚙️ Instalasi & Konfigurasi
1️⃣ Clone Repository
git clone https://github.com/yourusername/ringnet-invoice-backend.git
cd ringnet-invoice-backend

2️⃣ Install Dependencies
npm install

3️⃣ Konfigurasi Environment

Buat file .env di root project:

PORT=2002
DATABASE_URL=postgresql://username:password@localhost:5432/ringnet_invoice


⚠️ Ganti username, password, dan ringnet_invoice sesuai database lokal kamu.

4️⃣ Jalankan Server
npm run dev


Server akan berjalan di:

http://localhost:2002/api

🗄️ Struktur Database (PostgreSQL)
Tabel: invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nomor_invoice VARCHAR(50) NOT NULL,
  nama_pelanggan VARCHAR(100) NOT NULL,
  alamat TEXT,
  layanan VARCHAR(100),
  harga_paket NUMERIC(12,2),
  ppn NUMERIC(12,2),
  total NUMERIC(12,2),
  periode VARCHAR(50),
  status_pembayaran VARCHAR(50),
  tanggal_invoice TIMESTAMP DEFAULT NOW(),
  tanggal_jatuh_tempo TIMESTAMP
);

📦 Endpoint API
🔹 GET /api/invoices

Menampilkan seluruh data invoice.

Response:

{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nomor_invoice": "INV-20251105-001",
      "nama_pelanggan": "Zainal Salamun",
      "total": 166500,
      "status_pembayaran": "Belum Lunas"
    }
  ]
}

🔹 GET /api/invoices/:id

Menampilkan detail 1 invoice berdasarkan id.

Response:

{
  "success": true,
  "data": {
    "id": "uuid",
    "nama_pelanggan": "Zainal Salamun",
    "layanan": "Paket 50 Mbps",
    "periode": "November 2025"
  }
}

🔹 POST /api/invoices

Membuat invoice baru.

Body JSON:

{
  "nama_pelanggan": "Robih",
  "alamat": "Yogyakarta",
  "layanan": "100 Mbps",
  "harga_paket": 250000,
  "ppn": 27500,
  "total": 277500,
  "periode": "November 2025",
  "status_pembayaran": "Belum Lunas",
  "tanggal_invoice": "2025-11-07",
  "tanggal_jatuh_tempo": "2025-11-14"
}


Response:

{
  "success": true,
  "data": {
    "id": "ffa4b728-127f-4764-a447-689b16e4e8e2",
    "nomor_invoice": "INV-20251107-111338",
    "nama_pelanggan": "Robih",
    "total": 277500,
    "status_pembayaran": "Belum Lunas"
  }
}

🔹 PUT /api/invoices/:id

Mengupdate status pembayaran atau data invoice lain.

Body JSON:

{
  "status_pembayaran": "Lunas"
}


Response:

{
  "success": true,
  "data": {
    "id": "ffa4b728-127f-4764-a447-689b16e4e8e2",
    "status_pembayaran": "Lunas"
  }
}

🔹 DELETE /api/invoices/:id

Menghapus data invoice berdasarkan id.

Response:

{
  "success": true,
  "message": "Invoice deleted successfully"
}

🔐 Response Format

Semua endpoint menggunakan format respons yang konsisten:

{
  "success": true,
  "data": {...},     // atau array
  "message": "opsional untuk keterangan"
}


Jika terjadi error:

{
  "success": false,
  "message": "Internal Server Error"
}

🧠 Logic Nomor Invoice Otomatis

Nomor invoice otomatis di-generate berdasarkan tanggal:

INV-YYYYMMDD-XXX


Contoh:

INV-20251107-001


Diset di model layer (InvoiceModel.js) sebelum insert.

🧩 Integrasi dengan Frontend React

Frontend (ringnet-invoice-frontend) berinteraksi dengan backend melalui service:

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:2002/api";


Jadi pastikan backend sudah jalan di port 2002.

🧪 Contoh Uji Manual (via curl)
Tambah invoice:
curl -X POST http://localhost:2002/api/invoices \
  -H "Content-Type: application/json" \
  -d '{
    "nama_pelanggan": "Bang Jay",
    "alamat": "Yogyakarta",
    "layanan": "50 Mbps",
    "harga_paket": 150000,
    "ppn": 16500,
    "total": 166500,
    "periode": "November 2025",
    "status_pembayaran": "Belum Lunas",
    "tanggal_invoice": "2025-11-07",
    "tanggal_jatuh_tempo": "2025-11-14"
  }'

🧾 License

This project is licensed under the MIT License.
© 2025 Ringnet ISP / Bang Jay Development.
