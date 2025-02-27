import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import watches from "../Data";

export default function WatchEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const watch = watches.find((w) => w.id === parseInt(id));

  const [name, setName] = useState(watch.name);
  const [brand, setBrand] = useState(watch.brand);
  const [type, setType] = useState(watch.type);
  const [material, setMaterial] = useState(watch.material);
  const [size, setSize] = useState(watch.size);
  const [price, setPrice] = useState(watch.price);
  const [review, setReview] = useState(watch.review);
  const [sold, setSold] = useState(watch.sold);
  const [image, setImage] = useState(watch.image);

  const handleEdit = () => {
    watch.name = name;
    watch.brand = brand;
    watch.type = type;
    watch.material = material;
    watch.size = parseInt(size);
    watch.price = parseInt(price);
    watch.review = parseFloat(review);
    watch.sold = parseInt(sold);
    watch.image = image;
    navigate("/");
  };

  return (
    <div>
      <h2>Chỉnh sửa sản phẩm</h2>
      <input type="text" placeholder="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Thương hiệu" value={brand} onChange={(e) => setBrand(e.target.value)} />
      <input type="text" placeholder="Loại" value={type} onChange={(e) => setType(e.target.value)} />
      <input type="text" placeholder="Chất liệu" value={material} onChange={(e) => setMaterial(e.target.value)} />
      <input type="number" placeholder="Kích thước" value={size} onChange={(e) => setSize(e.target.value)} />
      <input type="number" placeholder="Giá" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Đánh giá" value={review} onChange={(e) => setReview(e.target.value)} />
      <input type="number" placeholder="Số lượng bán" value={sold} onChange={(e) => setSold(e.target.value)} />
      <input type="text" placeholder="Hình ảnh" value={image} onChange={(e) => setImage(e.target.value)} />
      <button onClick={handleEdit}>Lưu</button>
    </div>
  );
}