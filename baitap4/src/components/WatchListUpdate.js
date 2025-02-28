import React, { useState } from "react";
import { Link } from "react-router-dom";
import watches from "../Data";

export default function WatchListUpdate() {
  const [watchList] = useState(watches);

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
              <Link to={`/watch/${watch.id}/edit`} className="action-button update">
                Cập nhật
              </Link>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  );
}
