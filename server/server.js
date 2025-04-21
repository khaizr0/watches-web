const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken


const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb+srv://caophankhai123:oWBQscsuNkdrM7ao@cluster0.j50l5.mongodb.net/watch';
const JWT_SECRET = 'your_super_secret_key_replace_this_in_production'; // Replace with a strong, 

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

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// --- Default Admin Credentials (Use Environment Variables in Production!) ---
const DEFAULT_ADMIN_USERNAME = process.env.DEFAULT_ADMIN_USER || 'admin';
// !! CHANGE THIS PASSWORD or use an environment variable !!
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || 'password123';


// --- Function to Create Default Admin ---
const createDefaultAdmin = async () => {
  try {
      const existingAdmin = await User.findOne({ username: DEFAULT_ADMIN_USERNAME });

      if (!existingAdmin) {
          console.log(`Default admin user '${DEFAULT_ADMIN_USERNAME}' not found. Creating...`);

          // Hash the default password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, salt);

          // Create the admin user object
          const adminUser = new User({
              username: DEFAULT_ADMIN_USERNAME,
              password: hashedPassword,
          });

          // Save the user to the database
          await adminUser.save();
          console.log(`Default admin user '${DEFAULT_ADMIN_USERNAME}' created successfully.`);
          // Remind the developer to change the password
          if (DEFAULT_ADMIN_PASSWORD === 'password123') {
               console.warn(`\n************************************************************`);
               console.warn(`* WARNING: Using default password 'password123' for admin. *`);
               console.warn(`*          PLEASE CHANGE THIS IMMEDIATELY!                 *`);
               console.warn(`************************************************************\n`);
          }

      } else {
          console.log(`Default admin user '${DEFAULT_ADMIN_USERNAME}' already exists.`);
      }
  } catch (error) {
      console.error('Error during default admin user creation:', error);
  }
};

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Đã kết nối MongoDB Atlas');
    // Call the function to create the default admin AFTER connecting
    createDefaultAdmin();
})
.catch(err => {
    console.error('Lỗi kết nối MongoDB:', err);
    process.exit(1); // Exit if cannot connect to DB
});

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

// --- Middleware ---
app.use(cors({
  origin: 'https://watches.up.railway.app', 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies

  if (token == null) {
      return res.status(401).json({ error: "Unauthorized: No token provided" }); // if there isn't any token
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
          console.error("JWT Verification Error:", err.message);
          if (err.name === 'TokenExpiredError') {
               return res.status(401).json({ error: "Unauthorized: Token expired" });
          }
          return res.status(403).json({ error: "Forbidden: Invalid token" }); // if token is invalid
      }
      req.user = user; // Add decoded user payload to request object
      next(); // pass the execution off to whatever request the client intended
  });
};

app.post('/api/auth/register', async (req, res) => {
  try {
      const { username, password } = req.body;

      if (!username || !password) {
          return res.status(400).json({ error: "Username and password are required." });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ username: username.toLowerCase() });
      if (existingUser) {
          return res.status(400).json({ error: "Username already taken." });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
          username: username.toLowerCase(),
          password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully." });

  } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ error: "Internal server error during registration." });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      if (!username || !password) {
          return res.status(400).json({ error: "Username and password are required." });
      }

      // Find user by username
      const user = await User.findOne({ username: username.toLowerCase() });
      if (!user) {
          return res.status(401).json({ error: "Invalid credentials." }); // Generic error
      }

      // Compare submitted password with stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ error: "Invalid credentials." }); // Generic error
      }

      // Generate JWT
      const payload = {
          userId: user._id,
          username: user.username
          // Add other relevant non-sensitive info if needed (e.g., role)
      };

      const token = jwt.sign(
          payload,
          JWT_SECRET,
          { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Set JWT in an HTTP-Only cookie
      res.cookie('token', token, {
          httpOnly: true, // Cannot be accessed by client-side JavaScript
          secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
          sameSite: 'strict', // Or 'lax' depending on your needs
          maxAge: 3600000 // 1 hour in milliseconds
      });

      res.status(200).json({
          message: "Login successful.",
          user: { // Send back some user info (excluding password)
              id: user._id,
              username: user.username
          }
      });

  } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Internal server error during login." });
  }
});

// User Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
  });
  res.status(200).json({ message: "Logout successful." });
});

// Check Authentication Status (optional helper for frontend)
app.get('/api/auth/status', authenticateToken, (req, res) => {
  // If authenticateToken middleware passes, user is authenticated
  res.status(200).json({
      isAuthenticated: true,
      user: { // Send back user info from the token payload
          id: req.user.userId,
          username: req.user.username
      }
   });
});

// GET endpoint to retrieve all watches
app.get('/api/watch', async (req, res) => {
  try {
    const watches = await Watch.find({});
    res.status(200).json(watches);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//Tạo mới sản phẩm,

app.post('/api/watch', upload.single('image'), async (req, res) => {
  try {
    const { name, brand, type, material, size, price, review, sold } = req.body;

    // Validate input
    if (!name || !brand || !type || !material || !size || !price || !review || !sold) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Vui lòng chọn hình ảnh." });
    }

    // Sinh ID mới dựa trên count
    const count = await Watch.countDocuments();
    const orderStr = String(count + 1).padStart(3, '0');
    let typeCode = "";
    if (type.toLowerCase() === 'quartz')      typeCode = 'QUA';
    else if (type.toLowerCase() === 'automatic') typeCode = 'AUT';
    else if (type.toLowerCase() === 'smartwatch') typeCode = 'SMA';
    else return res.status(400).json({ error: "Loại phải là Quartz, Automatic hoặc Smartwatch." });

    const newId = `WATCH${typeCode}${orderStr}`;
    const imageName = req.file.filename;

    // Tạo và lưu Watch mới
    const newWatch = new Watch({
      id:       newId,
      name,
      brand,
      type,
      material,
      size,
      price,
      review,
      sold,
      image:    imageName,
    });
    await newWatch.save();

    // Trả về client kèm URL đầy đủ
    const result = newWatch.toObject();
    result.imageUrl = `https://watches-server.up.railway.app/uploads/${imageName}`;
    return res.status(201).json(result);

  } catch (error) {
    // 1. In stack trace để debug
    console.error(">>> [POST /api/watch] Error stack:", error.stack);

    // 2. Bắt lỗi Multer (upload)
    if (error instanceof multer.MulterError || error.name === 'MulterError') {
      return res.status(400).json({ error: "Lỗi khi upload hình ảnh." });
    }

    // 3. Bắt lỗi duplicate key (id trùng)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Mã sản phẩm đã tồn tại, vui lòng thử lại." });
    }

    // 4. Các lỗi khác
    return res.status(500).json({ error: "Internal server error." });
  }
});

// New PUT endpoint for updating a watch
app.put('/api/watch/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, brand, type, material, size, price, review, sold } = req.body;

    if (!name || !brand || !type || !material || !size || !price || !review || !sold) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
    }

    // Build the update payload
    let updateFields = {
      name,
      brand,
      type,
      material,
      size,
      price,
      review,
      sold,
    };

    // If a new image file is provided, update the image field
    if (req.file) {
      const imageName = req.file.filename;
      updateFields.image = imageName;
    }

    const updatedWatch = await Watch.findOneAndUpdate(
      { id: req.params.id },
      updateFields,
      { new: true }
    );

    if (!updatedWatch) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm với ID: " + req.params.id });
    }

    // Trong response trả về, thêm đường dẫn đầy đủ để client hiển thị ảnh
    const watchWithFullImageUrl = updatedWatch.toObject();
    watchWithFullImageUrl.imageUrl = `https://watches-server.up.railway.app/uploads/${updatedWatch.image}`;

    res.status(200).json(watchWithFullImageUrl);
  } catch (error) {
    console.error("Lỗi khi cập nhật watch:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// New GET endpoint to retrieve a single watch by ID
app.get('/api/watch/:id', async (req, res) => {
  try {
    const watch = await Watch.findOne({ id: req.params.id });
    if (!watch) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm với ID: " + req.params.id });
    }
    res.status(200).json(watch);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin watch:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.delete('/api/watch/:id', async (req, res) => {
  try {
    const deletedWatch = await Watch.findOneAndDelete({ id: req.params.id.toString() });
    if (!deletedWatch) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm với ID: " + req.params.id });
    }
    res.status(200).json({ success: true, message: "Sản phẩm đã được xóa", deletedWatch });
  } catch (error) {
    console.error("Lỗi khi xóa watch:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});