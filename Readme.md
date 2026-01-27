
# Library System with Geolocation - Full Stack

Backend API dan Frontend Website untuk sistem manajemen perpustakaan dengan fitur peminjaman berbasis lokasi.

## Fitur Lengkap
### Backend:
- RESTful API dengan Express.js
- Database MySQL dengan Sequelize ORM
- Role-based authentication (Admin/User)
- Geolocation tracking untuk peminjaman
- Validasi data

### Frontend:
- Responsive website dengan Bootstrap 5
- Role selection interface
- Book management (CRUD) untuk admin
- Borrow interface dengan geolocation untuk user
- Real-time map preview
- Form validation

## Instalasi dan Setup

### 1. Clone Repository
```bash
git clone [repository-url]
cd library-system-geolocation
2. Setup Backend
bash
# Masuk ke backend folder
cd backend

# Install dependencies
npm install

# Setup database
# 1. Buat database di MySQL:
mysql -u root -p
CREATE DATABASE library_db;

# 2. Update config/database.js dengan credential MySQL Anda

# 3. Seed database dengan data awal
npm run seed

# 4. Jalankan backend server
npm run dev
3. Setup Frontend
bash
# Buka terminal baru, masuk ke frontend folder
cd library-frontend

# Install dependencies
npm install

# Jalankan frontend server
npm run dev
4. Akses Aplikasi
Backend API: http://localhost:3000

Frontend Website: http://localhost:5173 (default Vite port)

Penggunaan
1. Pilih Role
Buka http://localhost:5173

Pilih role "Admin" atau "User"

Untuk user, set User ID

2. Fitur Admin
Tambah buku baru

Edit dan hapus buku

Lihat semua buku

3. Fitur User
Browse buku yang tersedia

Pinjam buku dengan lokasi

Gunakan "Get Location" untuk koordinat otomatis