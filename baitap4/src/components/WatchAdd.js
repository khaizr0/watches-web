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
    <div>
      <h2>Thêm sản phẩm mới</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="brand"
          placeholder="Thương hiệu"
          value={formData.brand}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Loại"
          value={formData.type}
          onChange={handleChange}
        />
        <input
          type="text"
          name="material"
          placeholder="Chất liệu"
          value={formData.material}
          onChange={handleChange}
        />
        <input
          type="number"
          name="size"
          placeholder="Kích thước"
          value={formData.size}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="review"
          placeholder="Đánh giá"
          value={formData.review}
          onChange={handleChange}
        />
        <input
          type="number"
          name="sold"
          placeholder="Số lượng bán"
          value={formData.sold}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Hình ảnh (tên file)"
          value={formData.image}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Thêm</button>
      </div>

      <div className="watch-list">
        <h1>Danh sách đồng hồ</h1>
        <div className="watch-container">
          {watchList.length > 0 ? (
            watchList.map((watch) => (
              <div className="watch-card" key={watch.id}>
                <img src={`/images/${watch.image}`} alt={watch.name} />
                <h3>
                  <Link to={`/watch/${watch.id}`}>{watch.name}</Link>
                </h3>
                <p>{watch.size} mm</p>
                <p className="price">
                  {watch.price.toLocaleString()} ₫
                </p>
                <div className="watch-rating">
                  <span className="star">&#9733;</span> {watch.review} • Đã bán{" "}
                  {watch.sold}
                </div>
              </div>
            ))
          ) : (
            <p>Không tìm thấy sản phẩm</p>
          )}
        </div>
      </div>
    </div>
  );
}