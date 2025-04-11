import React, { useState } from "react";
import watchesData from "../Data";

export default function WatchDelete() {
  const [watches, setWatches] = useState(watchesData);

  const handleRemove = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setWatches((prevWatches) => prevWatches.filter((watch) => watch.id !== id));
    }
  };

  return (
    <div className="watch-list">
      <h1>Chọn sản phẩm để xóa</h1>
      <div className="watch-container">
        {watches.length > 0 ? (
          watches.map((watch) => (
            <div className="watch-card" key={watch.id}>
              <img src={`/images/${watch.image}`} alt={watch.name} />
              <h3>{watch.name}</h3>
              <p>{watch.size} mm</p>
              <p className="price">{watch.price.toLocaleString()} ₫</p>
              <div className="watch-rating">
                <span className="star">&#9733;</span> {watch.review} • Đã bán {watch.sold}
              </div>
              <button onClick={() => handleRemove(watch.id)} className="action-button delete">
                Xóa
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
