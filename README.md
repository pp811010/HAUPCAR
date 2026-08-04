# 🚗 HAUPCAR - Car Management System

ระบบจัดการข้อมูลรถยนต์ (CRUD) พัฒนาด้วย React (Vite) และ Go (Gin) + SQLite

---

## 🛠️ Tech Stack
* **Frontend:** React (Vite) + Tailwind CSS + Shadcn UI
* **Backend:** Go (Gin) + GORM + SQLite

---

## 🚀 How to Run (วิธีรันระบบ)

### 1. รัน Backend (หลังบ้าน)
1. เปิด Terminal ไปที่โฟลเดอร์ `backend`:
   ```bash
   cd backend
   ```
2. รันคำสั่งเริ่มทำงาน (จะสร้างฐานข้อมูล `database.db` อัตโนมัติ):
   ```bash
   go run main.go
   ```

### 2. รัน Frontend (หน้าบ้าน)
1. เปิด Terminal ใหม่ไปที่โฟลเดอร์ `frontend`:
   ```bash
   cd frontend
   ```
2. คัดลอกตั้งค่า `.env`:
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env
   # macOS / Linux / cmd
   cp .env.example .env
   ```
3. ติดตั้ง library และรันระบบ:
   ```bash
   pnpm install
   pnpm dev
   ```
4. เปิดเบราว์เซอร์ไปที่: `http://localhost:5173`
