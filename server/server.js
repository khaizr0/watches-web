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

// Định nghĩa schema sản phẩm với các trường bổ sung
const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  material: { type: String, required: true },
  size: { type: Number, required: true },
  price: { type: Number, required: true },
  review: { type: Number, required: true },
  sold: { type: Number, required: true },
  imageUrl: { type: String } // lưu đường dẫn hình ảnh
});

const Product = mongoose.model('Product', productSchema);

// Lấy danh sách sản phẩm
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// Lấy chi tiết sản phẩm theo id
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// Thêm mới sản phẩm (với upload hình ảnh) và tự động tạo productId
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    // Lấy các trường còn lại từ body
    const { name, brand, type, material, size, price, review, sold } = req.body;
    
    // Tính số lượng sản phẩm hiện có để tạo productId mới
    const count = await Product.countDocuments();
    const newProductId = 'WATCH' + String(count + 1).padStart(3, '0');
    
    // Nếu có file hình ảnh, tạo đường dẫn đầy đủ
    const imageUrl = req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : '';
    
    const newProduct = new Product({
      productId: newProductId,
      name,
      brand,
      type,
      material,
      size: Number(size),
      price: Number(price),
      review: Number(review),
      sold: Number(sold),
      imageUrl
    });
    
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

app.listen(PORT, () => {
  console.log(`server đang chạy tại http://localhost:${PORT}`);
});
