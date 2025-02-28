import React from "react";
import { useParams, Link } from "react-router-dom";
import watches from "../Data";

export default function WatchDetail() {
  const { id } = useParams();
  const watch = watches.find((w) => w.id === parseInt(id));

  if (!watch) return <h2>Không tìm thấy sản phẩm</h2>;

  return (
    <div className="watch-detail">
      <h1>{watch.name}</h1>
      <img src={`/images/${watch.image}`} alt={watch.name} />
      <p>Kích thước: {watch.size} mm</p>
      <p>Giá: {watch.price.toLocaleString()} ₫</p>
      <p>Đánh giá: {watch.review} <span className="star">&#9733;</span></p>
      <p>Đã bán: {watch.sold}</p>
      <Link to="/">⬅ Quay lại danh sách</Link>
    </div>
  );
}