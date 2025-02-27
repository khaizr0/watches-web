import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import watches from "../Data";

function WatchDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const watch = watches.find((w) => w.id === parseInt(id));
  const [name, setName] = useState(watch ? watch.name : "");
  const [price, setPrice] = useState(watch ? watch.price : "");
  const [size, setSize] = useState(watch ? watch.size : "");
  const [review, setReview] = useState(watch ? watch.review : "");
  const [sold, setSold] = useState(watch ? watch.sold : "");

  if (!watch) return <h2>Không tìm thấy sản phẩm</h2>;

  const handleDelete = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirmed) {
      const index = watches.findIndex((w) => w.id === parseInt(id));
      if (index !== -1) {
        watches.splice(index, 1);
        navigate("/");
      }
    }
  };

  const handleEdit = () => {
    const index = watches.findIndex((w) => w.id === parseInt(id));
    if (index !== -1) {
      watches[index] = { ...watches[index], name, price, size, review, sold };
      navigate(`/watch/${id}`);
    }
  };

  return (
    <div className="watch-detail">
      <h1>Chỉnh sửa hoặc Xóa sản phẩm</h1>
      <div>
        <label>Tên:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Giá:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Kích thước:</label>
        <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
      </div>
      <div>
        <label>Đánh giá:</label>
        <input type="text" value={review} onChange={(e) => setReview(e.target.value)} />
      </div>
      <div>
        <label>Đã bán:</label>
        <input type="number" value={sold} onChange={(e) => setSold(e.target.value)} />
      </div>
      <button onClick={handleEdit}>Sửa sản phẩm</button>
      <button onClick={handleDelete}>Xóa sản phẩm</button>
      <button onClick={() => navigate("/")}>Quay lại danh sách</button>
    </div>
  );
}

export default WatchDelete;