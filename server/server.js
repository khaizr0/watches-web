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

// Định nghĩa schema và model cho đồng hồ
const watchSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  brand: String,
  type: String,
  material: String,
  size: Number,
  price: Number,
  review: Number,
  sold: Number,
  image: String,
});

const Watch = mongoose.model('watch', watchSchema, 'watchs');

// Cấu hình multer để lưu file vào thư mục "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Cho phép truy cập thư mục uploads từ bên ngoài
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());

//Lấy danh sách đồng hồ
app.get('/api/watch', async (req, res) => {
  try {
    const watches = await Watch.find();
    res.status(200).json(watches);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đồng hồ:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//Tạo mới sản phẩm,
app.post('/api/watch', upload.single('image'), async (req, res) => {
  try {
    const { name, brand, type, material, size, price, review, sold } = req.body;

    if (!name || !brand || !type || !material || !size || !price || !review || !sold) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Vui lòng chọn hình ảnh." });
    }

    // Lấy số thứ tự mới: đếm số sản phẩm hiện có
    const count = await Watch.countDocuments();
    const newOrder = count + 1;
    const orderStr = String(newOrder).padStart(3, '0');

    let typeCode = "";
    if (type.toLowerCase() === 'quartz') {
      typeCode = 'QUA';
    } else if (type.toLowerCase() === 'automatic') {
      typeCode = 'AUT';
    } else if (type.toLowerCase() === 'smartwatch') {
      typeCode = 'SMA';
    } else {
      return res.status(400).json({ error: "Loại đồng hồ phải là Quartz, Automatic hoặc Smartwatch." });
    }

    const newId = `WATCH${typeCode}${orderStr}`;

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const newWatch = new Watch({
      id: newId,
      name,
      brand,
      type,
      material,
      size,
      price,
      review,
      sold,
      image: imageUrl,
    });

    await newWatch.save();

    res.status(201).json(newWatch);
  } catch (error) {
    console.error("Lỗi khi tạo watch:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
