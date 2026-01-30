# **📚 Library Management System - User Guide**

## **🚀 Cara Menjalankan Aplikasi**

### **Prerequisites**
- **Node.js** (v14 atau lebih baru)
- **npm** atau **yarn**
- **Database** (MySQL/PostgreSQL/SQLite)
- **Git** (opsional)

---

## **Option 1: Menggunakan Vite Dev Server (Rekomendasi)**

### **Backend Setup**
```bash
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
```

### **Frontend Setup**
```bash
# 1. Buka terminal baru
cd library-system/frontend

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka browser ke:
# http://localhost:5173
```

---

## **Option 2: Menggunakan Live Server Extension (VS Code)**

### **Backend Setup** (sama seperti di atas)
```bash
cd backend
npm install
npm start
```

### **Frontend Setup**
```bash
cd frontend

# 1. Install http-server secara global
npm install -g http-server

# 2. Jalankan server
http-server -p 8080 --cors

# 3. Buka browser ke:
# http://localhost:8080
```

---

## **Option 3: Menggunakan XAMPP/WAMPP (PHP Developers)**

### **Backend Setup**
```bash
cd backend
npm install
npm start
# Backend berjalan di port 3000
```

### **Frontend Setup**
1. Letakkan folder `frontend` di `htdocs` (XAMPP) atau `www` (WAMPP)
2. Akses melalui: `http://localhost/frontend`
3. Pastikan backend berjalan di port 3000

---

## **🔧 Konfigurasi Database**

| Database  | Command |
|-----------|---------|
| **MySQL** | ```sql<br>CREATE DATABASE library_db;<br>GRANT ALL PRIVILEGES ON library_db.*<br>TO 'username'@'localhost'<br>IDENTIFIED BY 'password';<br>FLUSH PRIVILEGES;``` |
| **PostgreSQL** | ```sql<br>CREATE DATABASE library_db;<br>CREATE USER username WITH PASSWORD 'password';<br>GRANT ALL PRIVILEGES ON DATABASE library_db TO username;``` |
| **SQLite** | ```javascript<br>// Di config/database.js<br>dialect: 'sqlite',<br>storage: './database.sqlite'``` |

---

## **🌐 API Endpoints**

### **📚 Books Endpoints**

| Method | Endpoint | Role Required | Description |
|--------|----------|---------------|-------------|
| **GET** | `/api/books` | Public | Get all books |
| **GET** | `/api/books/:id` | Public | Get book by ID |
| **POST** | `/api/books` | Admin | Create new book |
| **PUT** | `/api/books/:id` | Admin | Update book |
| **DELETE** | `/api/books/:id` | Admin | Delete book |

### **📍 Borrow Endpoints**

| Method | Endpoint | Role Required | Description |
|--------|----------|---------------|-------------|
| **POST** | `/api/borrow` | User | Borrow a book |
| **GET** | `/api/borrow/user/:id` | User/Admin | Get user's borrowed books |
| **GET** | `/api/borrow` | Admin | Get all borrowed books |
| **DELETE** | `/api/borrow/:id` | User/Admin | Return a book |

### **Required Headers**
```
x-user-role: admin  # atau user
x-user-id: <user-id>
```

---

## **👨‍💻 Akun Testing**

| Role | User ID | Permissions | Access Level |
|------|---------|-------------|--------------|
| **Administrator** | `admin1` | Full access | ✅ All features |
| **User** | `123` (or random) | Borrow only | ✅ Browse books<br>✅ Borrow books<br>✅ View borrowed books |

---

## **🔍 Cara Penggunaan**

### **1️⃣ Memulai Aplikasi**
1. Buka `http://localhost:5173` (atau port yang sesuai)
2. Pilih role (Admin atau User)
3. Jika User, set User ID
4. Mulai jelajahi sistem

### **2️⃣ Sebagai Administrator**

| Feature | Description | Access Level |
|---------|-------------|--------------|
| **Kelola Buku** | Tambah, edit, hapus buku | ✅ Full |
| **Pantau Peminjaman** | Lihat semua user yang meminjam buku | ✅ Full |
| **Export Data** | Export data peminjaman ke CSV | ✅ Full |
| **Force Return** | Kembalikan buku untuk user | ✅ Full |

### **3️⃣ Sebagai User**

| Feature | Description | Access Level |
|---------|-------------|--------------|
| **Jelajahi Koleksi** | Lihat semua buku yang tersedia | ✅ Limited |
| **Pinjam Buku** | Pinjam buku dengan pelacakan lokasi | ✅ Limited |
| **Lihat Peminjaman** | Track buku yang sedang dipinjam | ✅ Limited |
| **Kembalikan Buku** | Kembalikan buku sebelum jatuh tempo | ✅ Limited |

---

## **📊 Database Models**

### **📚 Book Table Structure**

| Column | Type | Description |
|--------|------|-------------|
| **id** | INTEGER | Primary key, auto-increment |
| **title** | STRING | Book title (required) |
| **author** | STRING | Book author (required) |
| **stock** | INTEGER | Available copies (default: 1) |
| **createdAt** | DATE | Record creation date |
| **updatedAt** | DATE | Last update date |

### **📍 BorrowLog Table Structure**

| Column | Type | Description |
|--------|------|-------------|
| **id** | INTEGER | Primary key, auto-increment |
| **userId** | INTEGER | User ID who borrowed |
| **bookId** | INTEGER | Foreign key to books table |
| **borrowDate** | DATE | Borrow date (default: now) |
| **latitude** | FLOAT | Location latitude |
| **longitude** | FLOAT | Location longitude |

---

## **🖼️ Screenshots & Features**

### **Frontend Dashboard**
![Dashboard](https://github.com/user-attachments/assets/930bfc91-7b07-49f0-ad68-84a215feabe8)

### **Role Selection**
![Role Selector](https://github.com/user-attachments/assets/aa73d3d5-df9c-4cf5-8bb2-97c98ec86e67)

### **Book Availability Check**
![Book Check](https://github.com/user-attachments/assets/eefad2eb-3218-46e8-877d-6caec558c450)

### **Borrow Book (User)**
![Borrow Book](https://github.com/user-attachments/assets/dde99ef5-3451-44bc-a6c7-0bad80804e93)

### **Book Details**
![Book Details](https://github.com/user-attachments/assets/8d7c11f3-03db-4301-968e-a3c0aeceeefa)

### **Admin Panel**
![Admin Panel](https://github.com/user-attachments/assets/3bd474dd-6c14-4e89-b1fd-2910807deb52)

### **Admin - Book Details**
![Admin Book Details](https://github.com/user-attachments/assets/85977bbf-d458-4efd-9391-f60589834ef2)

### **Add Book (Admin)**
![Add Book](https://github.com/user-attachments/assets/60c3e0bf-f209-43e1-b47e-12059a8081b6)

### **Update Book (Admin)**
![Update Book](https://github.com/user-attachments/assets/b520d52f-10f2-4aca-b183-1ad6dce97694)

### **Delete Book (Admin)**
![Delete Book](https://github.com/user-attachments/assets/215a2941-830e-4dc4-9fed-e3e05e289079)

---

## **🐛 Troubleshooting**

### **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| **CORS Error** | ```javascript<br>app.use(cors({<br>  origin: 'http://localhost:5173',<br>  credentials: true<br>}));``` |
| **Database Connection Error** | - Check .env credentials<br>- Ensure database service is running<br>- For MySQL: `sudo service mysql start` |
| **Port Already in Use** | ```bash<br># Find process using port<br>lsof -i :3000<br># Kill process<br>kill -9 <PID>``` |
| **Module Not Found** | ```bash<br>rm -rf node_modules package-lock.json<br>npm install``` |

---

## **📱 Responsive Support**

| Device | Screen Size | Support Status |
|--------|-------------|----------------|
| **Desktop** | ≥ 1200px | ✅ Fully Supported |
| **Tablet** | 768px - 1199px | ✅ Fully Supported |
| **Mobile** | ≤ 767px | ✅ Fully Supported |
| **Touch Interactions** | All touch devices | ✅ Fully Supported |

---

## **🔒 Security Features**

| Feature | Implementation |
|---------|----------------|
| **Role-based Access Control** | ✅ Implemented |
| **Input Validation** | ✅ Implemented |
| **SQL Injection Prevention** | ✅ Sequelize ORM |
| **XSS Protection** | ✅ Input sanitization |
| **Secure Headers** | ✅ Implemented |

---

## **🚀 Quick Start Commands**

### **Development Mode**
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev

# Open: http://localhost:5173
```

### **Production Mode**
```bash
# Build frontend
cd frontend
npm run build

# Run backend
cd backend
npm start

# Open: http://localhost:3000
```

---

## **📈 Future Enhancements**

| Priority | Feature | Status |
|----------|---------|--------|
| **High** | Email notifications for return reminders | 🚧 Planned |
| **High** | QR code scanning for books | 🚧 Planned |
| **Medium** | Multi-language support | 📋 Backlog |
| **Medium** | Advanced reporting with charts | 📋 Backlog |
| **Low** | Social sharing features | 💡 Idea |

---

## **📄 License**
MIT License - see [LICENSE](LICENSE) file for details

## **👥 Authors**
- **Your Name** - *Initial work* - [YourWebsite](https://yourwebsite.com)

## **🙏 Acknowledgments**
- Bootstrap team for amazing CSS framework
- Sequelize team for excellent ORM
- All contributors and testers

---

**⭐ Jika project ini membantu Anda, jangan lupa beri star!**

**🐛 Untuk bug reports dan feature requests, buka [Issues](https://github.com/yourusername/library-system/issues)**
