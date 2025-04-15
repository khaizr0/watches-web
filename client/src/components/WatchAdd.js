import React, { useState } from "react";
import { Link } from "react-router-dom";
import watchesData from "../Data";

export default function WatchAdd() {
  // Khởi tạo danh sách đồng hồ từ Data.js
  const [watchList, setWatchList] = useState([...watchesData]);

  // State lưu thông tin form
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    material: "",
    size: "",
    price: "",
    review: "",
    sold: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const { name, brand, type, material, size, price, review, sold, image } =
      formData;

    if (
      !name ||
      !brand ||
      !type ||
      !material ||
      !size ||
      !price ||
      !review ||
      !sold ||
      !image
    ) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newWatch = {
      id: watchList.length + 1,
      name,
      brand,
      type,
      material,
      size: parseInt(size),
      price: parseInt(price),
      review: parseFloat(review),
      sold: parseInt(sold),
      image,
    };

    setWatchList([...watchList, newWatch]);
    // Reset lại form
    setFormData({
      name: "",
      brand: "",
      type: "",
      material: "",
      size: "",
      price: "",
      review: "",
      sold: "",
      image: "",
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-center text-2xl font-bold mb-5">Thêm sản phẩm mới</h2>
      <div className="max-w-lg mx-auto mb-8">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Tên sản phẩm"
            value={formData.name}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="text"
            name="brand"
            placeholder="Thương hiệu"
            value={formData.brand}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="text"
            name="type"
            placeholder="Loại"
            value={formData.type}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="text"
            name="material"
            placeholder="Chất liệu"
            value={formData.material}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="number"
            name="size"
            placeholder="Kích thước (mm)"
            value={formData.size}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Giá"
            value={formData.price}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="number"
            name="review"
            placeholder="Đánh giá"
            value={formData.review}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="number"
            name="sold"
            placeholder="Số lượng bán"
            value={formData.sold}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="text"
            name="image"
            placeholder="Hình ảnh (tên file)"
            value={formData.image}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Thêm
        </button>
      </div>

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
                  src={`/images/${watch.image}`}
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
