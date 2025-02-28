import React, { useState } from "react";
import { Link } from "react-router-dom";
import watches from "../Data";

export default function WatchFind() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWatches = watches.filter((watch) =>
    watch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="watch-list">
      <h1>Tìm kiếm đồng hồ</h1>
      <input
        type="text"
        placeholder="Nhập tên sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="watch-container">
        {filteredWatches.length > 0 ? (
          filteredWatches.map((watch) => (
            <div className="watch-card" key={watch.id}>
              <img src={`/images/${watch.image}`} alt={watch.name} />
              <h3>
                <Link to={`/watch/${watch.id}`}>{watch.name}</Link>
              </h3>
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
