import React, { useState } from "react";
import watches from "../Data";

export default function WatchList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc danh sách đồng hồ theo từ khóa tìm kiếm
  const filteredWatches = watches.filter((watch) =>
    watch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="watch-list">
      <h1>Danh sách đồng hồ</h1>
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm đồng hồ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="watch-container">
        {filteredWatches.length > 0 ? (
          filteredWatches.map((watch) => (
            <div className="watch-card" key={watch.id}>
              <img src={`/images/${watch.image}`} alt={watch.name} />
              <h3>{watch.name}</h3>
              <p>{watch.size} mm</p>
              <p className="price">{watch.price.toLocaleString()} ₫</p>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  );
}
