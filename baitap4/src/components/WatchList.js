import React from "react";
import watches from "../Data";

export default function WatchList() {
  return (
    <div className="watch-list">
      <h1>Danh sách đồng hồ</h1>
      <div className="watch-container">
        {watches.map((watch) => (
          <div className="watch-card" key={watch.id}>
            <img src={`/images/${watch.image}`} alt={watch.name} />
            <h3>{watch.name}</h3>
            <p>{watch.size}</p>
            <p className="price">{watch.price.toLocaleString()} ₫</p>
          </div>
        ))}
      </div>
    </div>
  );
}