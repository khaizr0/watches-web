import React, { useState } from "react";
import watches from "../Data";

export default function WatchUpdate() {
  // Tạo state cho danh sách sản phẩm (lấy từ Data.js)
  const [watchList, setWatchList] = useState([...watches]);
  // State để xác định xem đang chỉnh sửa sản phẩm nào (null = không chỉnh sửa)
  const [editingId, setEditingId] = useState(null);

  // Các state cho form chỉnh sửa
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [review, setReview] = useState("");
  const [sold, setSold] = useState("");
  const [image, setImage] = useState("");

  // Hàm gọi khi bấm "Cập nhật" trên 1 sản phẩm
  const handleEditClick = (watch) => {
    setEditingId(watch.id);
    setName(watch.name);
    setBrand(watch.brand);
    setType(watch.type);
    setMaterial(watch.material);
    setSize(watch.size);
    setPrice(watch.price);
    setReview(watch.review);
    setSold(watch.sold);
    setImage(watch.image);
  };

  // Hàm lưu thay đổi
  const handleSave = () => {
    const updatedList = watchList.map((w) => {
      if (w.id === editingId) {
        return {
          ...w,
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
      }
      return w;
    });
    setWatchList(updatedList);
    setEditingId(null);
  };

  // Hàm hủy chỉnh sửa, quay lại danh sách
  const handleCancel = () => {
    setEditingId(null);
  };

  // Nếu đang chỉnh sửa, render form chỉnh sửa
  if (editingId !== null) {
    return (
      <div>
        <h2>Chỉnh sửa sản phẩm</h2>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Thương hiệu"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Loại"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Chất liệu"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
        <input
          type="number"
          placeholder="Kích thước"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <input
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Đánh giá"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <input
          type="number"
          placeholder="Số lượng bán"
          value={sold}
          onChange={(e) => setSold(e.target.value)}
        />
        <input
          type="text"
          placeholder="Hình ảnh"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={handleSave}>Lưu</button>
        <button onClick={handleCancel}>Quay lại</button>
      </div>
    );
  }

  // Nếu không chỉnh sửa, render danh sách sản phẩm
  return (
    <div className="watch-list">
      <h1>Chọn sản phẩm để cập nhật</h1>
      <div className="watch-container">
        {watchList.length > 0 ? (
          watchList.map((watch) => (
            <div className="watch-card" key={watch.id}>
              <img src={`/images/${watch.image}`} alt={watch.name} />
              <h3>{watch.name}</h3>
              <p>{watch.size} mm</p>
              <p className="price">{watch.price.toLocaleString()} ₫</p>
              <div className="watch-rating">
                <span className="star">&#9733;</span> {watch.review} • Đã bán {watch.sold}
              </div>
              <button onClick={() => handleEditClick(watch)}>
                Cập nhật
              </button>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  );
}
