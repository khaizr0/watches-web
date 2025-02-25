import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import watches from "./Data";

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Trang chủ</Link></li>
        
      </ul>
    </nav>
  );
}

function WatchList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredWatches = watches
    .filter((watch) =>
      watch.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <div className="watch-list">
      <h1>Danh sách đồng hồ</h1>
      <input
        type="text"
        placeholder="Tìm kiếm đồng hồ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="sort-select"
      >
        <option value="asc">Giá thấp đến cao</option>
        <option value="desc">Giá cao đến thấp</option>
      </select>
      <div className="watch-container">
        {filteredWatches.length > 0 ? (
          filteredWatches.map((watch) => (
            <div className="watch-card" key={watch.id}>
              <img src={`/images/${watch.image}`} alt={watch.name} />
              <h3><Link to={`/watch/${watch.id}`}>{watch.name}</Link></h3>
              <p>{watch.size} mm</p>
              <p className="price">{watch.price.toLocaleString()} ₫</p>
              <div className="watch-rating">
                <span className="star">&#9733;</span> {watch.review} • Đã bán {watch.sold}
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  );
}

// 📌 Component Chi Tiết Đồng Hồ
function WatchDetail() {
  const { id } = useParams();
  const watch = watches.find((w) => w.id === parseInt(id));

  if (!watch) return <h2>Không tìm thấy sản phẩm</h2>;

  return (
    <div className="watch-detail">
      <h1>{watch.name}</h1>
      <img src={`/images/${watch.image}`} alt={watch.name} />
      <p>Kích thước: {watch.size} mm</p>
      <p>Giá: {watch.price.toLocaleString()} ₫</p>
      <p>Đánh giá: {watch.review}</p>
      <p>Đã bán: {watch.sold}</p>
      <Link to="/">⬅ Quay lại danh sách</Link>
    </div>
  );
}

function Home() {
  return <h1>Chào mừng bạn đến với cửa hàng đồng hồ</h1>;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WatchList />} />
        <Route path="/watch/:id" element={<WatchDetail />} />
      </Routes>
    </Router>
  );
}
