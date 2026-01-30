🚀 Cara Menjalankan Aplikasi
Prerequisites
Node.js (v14 atau lebih baru)

npm atau yarn

Database (MySQL/PostgreSQL/SQLite)

Git

Option 1: Menggunakan Vite Dev Server (Rekomendasi)
Backend Setup
bash
# 1. Clone repository (jika ada)
git clone <repository-url>
cd library-system/backend

# 2. Install dependencies
npm install

# 3. Konfigurasi database
# Buat file .env dengan konten:
DB_HOST=localhost
DB_NAME=library_db
DB_USER=root
DB_PASS=password
DB_DIALECT=mysql  # atau postgres, sqlite
JWT_SECRET=your-secret-key

# 4. Setup database
# Untuk MySQL:
mysql -u root -p
CREATE DATABASE library_db;

# 5. Jalankan server backend
npm start
# atau untuk development dengan auto-reload:
npm run dev
Frontend Setup
bash
# 1. Buka terminal baru
cd library-system/frontend

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka browser ke:
# http://localhost:5173
Option 2: Menggunakan Live Server Extension (VS Code)
Backend Setup (sama seperti di atas)
bash
cd backend
npm install
npm start
Frontend Setup
bash
cd frontend

# 1. Install http-server secara global
npm install -g http-server

# 2. Jalankan server
http-server -p 8080 --cors

# 3. Buka browser ke:
# http://localhost:8080
Option 3: Menggunakan XAMPP/WAMPP (PHP Developers)
Backend Setup
bash
cd backend
npm install
npm start
# Backend berjalan di port 3000
Frontend Setup
Letakkan folder frontend di htdocs (XAMPP) atau www (WAMPP)

Akses melalui: http://localhost/frontend

Pastikan backend berjalan di port 3000

🔧 Konfigurasi Database
MySQL
sql
CREATE DATABASE library_db;
GRANT ALL PRIVILEGES ON library_db.* TO 'username'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
PostgreSQL
sql
CREATE DATABASE library_db;
CREATE USER username WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE library_db TO username;
SQLite
javascript
// Di config/database.js
dialect: 'sqlite',
storage: './database.sqlite'
🌐 API Endpoints
Books
text
GET    /api/books              # Get all books
GET    /api/books/:id          # Get book by ID
POST   /api/books              # Create new book (admin only)
PUT    /api/books/:id          # Update book (admin only)
DELETE /api/books/:id          # Delete book (admin only)
Borrow
text
POST   /api/borrow             # Borrow a book (user only)
GET    /api/borrow/user/:id    # Get user's borrowed books
GET    /api/borrow             # Get all borrowed books (admin only)
DELETE /api/borrow/:id         # Return a book
Headers yang Diperlukan
text
x-user-role: admin/user
x-user-id: <user-id>
👨‍💻 Akun Testing
Admin
Role: admin

User ID: admin1

Permissions: Full access

User
Role: user

User ID: 123 (atau angka random)

Permissions: Borrow books only

🔍 Cara Penggunaan
1. Memulai Aplikasi
Buka http://localhost:5173 (atau port yang sesuai)

Pilih role (Admin atau User)

Jika User, set User ID

Mulai jelajahi sistem

2. Sebagai Administrator
Kelola Buku: Tambah, edit, hapus buku

Pantau Peminjaman: Lihat semua user yang meminjam buku

Export Data: Export data peminjaman ke CSV

Force Return: Kembalikan buku untuk user

3. Sebagai User
Jelajahi Koleksi: Lihat semua buku yang tersedia

Pinjam Buku: Pinjam buku dengan pelacakan lokasi

Lihat Peminjaman: Track buku yang sedang dipinjam

Kembalikan Buku: Kembalikan buku sebelum jatuh tempo

Database akan otomatis tersinkronisasi dan tabel akan dibuat jika belum ada.
GET /api/books : Melihat semua buku
<img width="1829" height="889" alt="image" src="https://github.com/user-attachments/assets/65ba3daf-8a15-404b-bc34-e85a13805f68" />
GET /api/books/:id : Detail buku.
<img width="1822" height="825" alt="image" src="https://github.com/user-attachments/assets/17b878d7-082f-4ff9-b17f-e784a52de74d" />
Admin Mode (Header x-user-role: admin):
<img width="1789" height="962" alt="image" src="https://github.com/user-attachments/assets/e12bdc62-aac4-452e-adc4-dd0957f178d5" />
POST /api/books : Tambah buku baru.
<img width="1786" height="881" alt="image" src="https://github.com/user-attachments/assets/3dad1a02-52fb-4d24-a62c-ebc987c9bd66" />
PUT /api/books/:id : Update buku.
<img width="1780" height="870" alt="image" src="https://github.com/user-attachments/assets/b584226b-bb06-4a4f-9f15-d83263b3ef6f" />
DELETE /api/books/:id : Hapus buku.
<img width="1768" height="934" alt="image" src="https://github.com/user-attachments/assets/2d3fc73d-0c89-49fc-beda-8904a61f2eb6" />
User Mode (Header x-user-role: user & x-user-id: [id]):
<img width="1789" height="947" alt="image" src="https://github.com/user-attachments/assets/85513833-0873-42f0-ae52-9a32d2d154cf" />
POST /api/borrow : Meminjam buku.
<img width="1782" height="883" alt="image" src="https://github.com/user-attachments/assets/0d1fe823-72c0-4f00-b105-bff9381fb71c" />

VALIDASI 
<img width="1773" height="874" alt="image" src="https://github.com/user-attachments/assets/f797479c-b8f1-44fe-8d19-a465fd13ed96" />


Model Database:
1.Book
<img width="1316" height="551" alt="image" src="https://github.com/user-attachments/assets/e2334308-b431-4409-a3b3-8a58c744fa40" />
2.BorrowLog
<img width="1336" height="577" alt="image" src="https://github.com/user-attachments/assets/96e44343-f1c4-46dd-8411-f5a512045c60" />


FRONTEND 

DASHBOARD 
<img width="1895" height="872" alt="image" src="https://github.com/user-attachments/assets/930bfc91-7b07-49f0-ad68-84a215feabe8" />



SELECT ROLE 
<img width="1919" height="884" alt="image" src="https://github.com/user-attachments/assets/aa73d3d5-df9c-4cf5-8bb2-97c98ec86e67" />



CEK KETERSEDIAAN BUKU 
<img width="1906" height="855" alt="image" src="https://github.com/user-attachments/assets/eefad2eb-3218-46e8-877d-6caec558c450" />


PINJAM BUKU 
<img width="1900" height="876" alt="image" src="https://github.com/user-attachments/assets/dde99ef5-3451-44bc-a6c7-0bad80804e93" />



CEK DETAIL BUKU 
<img width="1893" height="872" alt="image" src="https://github.com/user-attachments/assets/8d7c11f3-03db-4301-968e-a3c0aeceeefa" />


HALAMAN ADMIN 
<img width="1907" height="879" alt="image" src="https://github.com/user-attachments/assets/3bd474dd-6c14-4e89-b1fd-2910807deb52" />


DETAIL BUKU (ADMIN)
<img width="1901" height="866" alt="image" src="https://github.com/user-attachments/assets/85977bbf-d458-4efd-9391-f60589834ef2" />


ADD BOOK 
<img width="1902" height="874" alt="image" src="https://github.com/user-attachments/assets/60c3e0bf-f209-43e1-b47e-12059a8081b6" />


UPDATE BOOK 
<img width="1903" height="873" alt="image" src="https://github.com/user-attachments/assets/b520d52f-10f2-4aca-b183-1ad6dce97694" />



DETAIL BOOK (ADMIN)
<img width="1902" height="873" alt="image" src="https://github.com/user-attachments/assets/f7291631-4828-4524-bfce-acaf37dc3dfb" />


DELETE BOOK 
<img width="1898" height="974" alt="image" src="https://github.com/user-attachments/assets/215a2941-830e-4dc4-9fed-e3e05e289079" />







buat agar rapi seperti tabel gitu
