import React, { useState } from "react";
import { Link } from "react-router-dom";
import watches from "../Data";

export default function WatchList({ mode = "view" }) {
  const [watchList] = useState(watches);
  
  // Xác định tiêu đề dựa trên chế độ
  const getTitle = () => {
    switch (mode) {
      case "update": return "Chọn sản phẩm để cập nhật";
      case "delete": return "Chọn sản phẩm để xóa";
      default: return "Danh sách đồng hồ";
    }
  };
  
  // Xác định nút hành động và đường dẫn dựa trên chế độ
  const getActionButton = (watch) => {
    switch (mode) {
      case "update":
        return (
          <Link to={`/watch/${watch.id}/edit`} className="action-button update">
            Cập nhật
          </Link>
        );
      case "delete":
        return (
          <Link to={`/watch/${watch.id}/delete`} className="action-button delete">
            Xóa
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="watch-list">
      <h1>{getTitle()}</h1>
      <div className="watch-container">
        {watchList.length > 0 ? (
          watchList.map((watch) => (
            <div className="watch-card" key={watch.id}>
              <img src={`/images/${watch.image}`} alt={watch.name} />
              <h3>
                {mode === "view" ? (
                  <Link to={`/watch/${watch.id}`}>{watch.name}</Link>
                ) : (
                  watch.name
                )}
              </h3>
              <p>{watch.size} mm</p>
              <p className="price">{watch.price.toLocaleString()} ₫</p>
              <div className="watch-rating">
                <span className="star">&#9733;</span> {watch.review} • Đã bán {watch.sold}
              </div>
              {getActionButton(watch)}
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  );
}