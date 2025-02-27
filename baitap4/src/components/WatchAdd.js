import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import watches from "../Data";

export default function WatchAdd() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [review, setReview] = useState("");
  const [sold, setSold] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!name || !brand || !type || !material || !size || !price || !review || !sold || !image) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newWatch = {
      id: watches.length + 1,
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
    watches.push(newWatch);
    navigate("/");
  };

  return (
    <div>
      <h2>Thêm sản phẩm mới</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" placeholder="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Thương hiệu" value={brand} onChange={(e) => setBrand(e.target.value)} />
      <input type="text" placeholder="Loại" value={type} onChange={(e) => setType(e.target.value)} />
      <input type="text" placeholder="Chất liệu" value={material} onChange={(e) => setMaterial(e.target.value)} />
      <input type="number" placeholder="Kích thước" value={size} onChange={(e) => setSize(e.target.value)} />
      <input type="number" placeholder="Giá" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Đánh giá" value={review} onChange={(e) => setReview(e.target.value)} />
      <input type="number" placeholder="Số lượng bán" value={sold} onChange={(e) => setSold(e.target.value)} />
      <input type="text" placeholder="Hình ảnh" value={image} onChange={(e) => setImage(e.target.value)} />
      <button onClick={handleAdd}>Thêm</button>
    </div>
  );
}