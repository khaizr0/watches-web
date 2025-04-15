const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb+srv://caophankhai123:oWBQscsuNkdrM7ao@cluster0.j50l5.mongodb.net/watch';

// Kết nối MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Đã kết nối MongoDB Atlas'))
.catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Cấu hình multer để lưu file vào thư mục "uploads"
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    // Sử dụng thời gian và tên file gốc để tránh trùng lặp
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Cho phép truy cập thư mục uploads từ bên ngoài
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
// Sử dụng express.json() cho các endpoint nhận JSON (các endpoint upload dùng FormData không cần)
app.use(express.json());



app.listen(PORT, () => {
  console.log(`server đang chạy tại http://localhost:${PORT}`);
});
