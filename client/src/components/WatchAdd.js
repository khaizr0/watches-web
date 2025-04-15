import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WatchAdd() {
  const [watchList, setWatchList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "Quartz", // mặc định chọn Quartz
    material: "",
    size: "",
    price: "",
    review: "",
    sold: "",
    image: null, // sẽ lưu file object
  });

  // Load danh sách sản phẩm khi component mount
  useEffect(() => {
    const loadWatches = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/watch");
        if (response.ok) {
          const data = await response.json();
          setWatchList(data);
        } else {
          console.error("Lỗi khi load dữ liệu:", response.statusText);
        }
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    };

    loadWatches();
  }, []);

  // Xử lý các trường input dạng text/number/select
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý input file cho hình ảnh
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Tính dự kiến mã ID (read-only) dựa vào số sản phẩm hiện có và giá trị chọn tại dropdown
  const predictedId = (() => {
    const newOrder = watchList.length + 1;
    const orderStr = String(newOrder).padStart(3, "0");
    let typeCode = "";
    if (formData.type.toLowerCase() === "quartz") {
      typeCode = "QUA";
    } else if (formData.type.toLowerCase() === "automatic") {
      typeCode = "AUT";
    } else if (formData.type.toLowerCase() === "smartwatch") {
      typeCode = "SMA";
    }
    return `WATCH${typeCode}${orderStr}`;
  })();

  // Hàm xử lý thêm sản phẩm mới, dùng FormData để upload file cùng các trường khác
  const handleAdd = async () => {
    const { name, brand, type, material, size, price, review, sold, image } = formData;
    if (!name || !brand || !type || !material || !size || !price || !review || !sold || !image) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Sử dụng FormData để gửi cả file và dữ liệu dạng text
    const data = new FormData();
    data.append("name", name);
    data.append("brand", brand);
    data.append("type", type);
    data.append("material", material);
    data.append("size", size);
    data.append("price", price);
    data.append("review", review);
    data.append("sold", sold);
    data.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/watch", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Lỗi: " + errorData.error);
        return;
      }

      const createdWatch = await response.json();
      // Cập nhật danh sách sản phẩm mới
      setWatchList([...watchList, createdWatch]);

      // Reset lại form; đặt lại type về mặc định là Quartz và image về null
      setFormData({
        name: "",
        brand: "",
        type: "Quartz",
        material: "",
        size: "",
        price: "",
        review: "",
        sold: "",
        image: null,
      });
      // Nếu cần reset giá trị input file (nếu trình duyệt không tự reset)
      document.getElementById("imageInput").value = "";
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Lỗi khi gọi API.");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-center text-2xl font-bold mb-5">Thêm sản phẩm mới</h2>
      
      <div className="max-w-lg mx-auto mb-8">
        <div className="grid grid-cols-1 gap-4">
          {/* Hiển thị mã sản phẩm dự kiến */}
          <input
            type="text"
            name="id"
            placeholder="Mã sản phẩm"
            value={predictedId}
            readOnly
            className="p-2.5 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />

          <input
            type="text"
            name="name"
            placeholder="Tên sản phẩm"
            value={formData.name}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />

          <input
            type="text"
            name="brand"
            placeholder="Thương hiệu"
            value={formData.brand}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />

          {/* Dropdown cho loại */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          >
            <option value="Quartz">Quartz</option>
            <option value="Automatic">Automatic</option>
            <option value="Smartwatch">Smartwatch</option>
          </select>

          <input
            type="text"
            name="material"
            placeholder="Chất liệu"
            value={formData.material}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />

          <input
            type="number"
            name="size"
            placeholder="Kích thước (mm)"
            value={formData.size}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />

          <input
            type="number"
            name="price"
            placeholder="Giá"
            value={formData.price}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />

          <input
            type="number"
            name="review"
            placeholder="Đánh giá"
            value={formData.review}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />

          <input
            type="number"
            name="sold"
            placeholder="Số lượng bán"
            value={formData.sold}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />

          {/* File input để chọn hình ảnh */}
          <input
            id="imageInput"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />
        </div>
        
        <button
          onClick={handleAdd}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg"
        >
          Thêm
        </button>
      </div>

      {/* Hiển thị danh sách đồng hồ */}
      <div>
        <h1 className="text-center text-2xl font-bold mb-5">Danh sách đồng hồ</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {watchList.length > 0 ? (
            watchList.map((watch) => (
              <div
                className="border border-gray-300 rounded p-3 bg-white shadow-sm group"
                key={watch.id}
              >
                <img
                  className="w-full h-64 object-scale-down mb-2 transition-transform duration-200 hover:-translate-y-1"
                  src={watch.image}
                  alt={watch.name}
                />
                <h3 className="text-lg font-semibold text-gray-800 my-2">
                  <Link
                    to={`/watch/${watch.id}`}
                    className="transition-colors duration-300 group-hover:text-blue-500"
                  >
                    {watch.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600">{watch.size} mm</p>
                <p className="text-lg text-red-600 font-bold">
                  {watch.price.toLocaleString()} ₫
                </p>
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  <span className="text-yellow-400 mr-1 text-lg">&#9733;</span>
                  {watch.review} • Đã bán {watch.sold}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-base text-gray-500 mt-5">
              Không tìm thấy sản phẩm
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
