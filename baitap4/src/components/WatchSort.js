import React, { useState } from "react";
import { Link } from "react-router-dom";
import watches from "../Data";

export default function WatchSort() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [brand, setBrand] = useState("all");
  const [type, setType] = useState("all");
  const [material, setMaterial] = useState("all");
  const [size, setSize] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [review, setReview] = useState("all");
  const [sold, setSold] = useState("all");

  // Lọc sản phẩm theo các tiêu chí đã chọn
  const filteredWatches = watches.filter((watch) =>
    (brand === "all" || watch.brand === brand) &&
    (type === "all" || watch.type === type) &&
    (material === "all" || watch.material === material) &&
    (size === "all" || watch.size === parseInt(size)) &&
    (priceRange === "all" ||
      (priceRange === "low" ? watch.price < 100000000 : watch.price >= 100000000)) &&
    (review === "all" || watch.review >= parseInt(review)) &&
    (sold === "all" || watch.sold >= parseInt(sold))
  );

  filteredWatches.sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const resetFilters = () => {
    setSortOrder("asc");
    setBrand("all");
    setType("all");
    setMaterial("all");
    setSize("all");
    setPriceRange("all");
    setReview("all");
    setSold("all");
  };

  return (
    <div className="watch-list">
      <h1>Lọc và Sắp xếp đồng hồ</h1>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="sort-select"
      >
        <option value="asc">Giá thấp đến cao</option>
        <option value="desc">Giá cao đến thấp</option>
      </select>
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="filter-select"
      >
        <option value="all">Tất cả thương hiệu</option>
        <option value="Rolex">Rolex</option>
        <option value="Apple">Apple</option>
        <option value="Samsung">Samsung</option>
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="filter-select"
      >
        <option value="all">Tất cả loại</option>
        <option value="Quartz">Quartz</option>
        <option value="Automatic">Automatic</option>
        <option value="Smartwatch">Smartwatch</option>
      </select>
      <select
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="filter-select"
      >
        <option value="all">Tất cả chất liệu</option>
        <option value="Stainless Steel">Stainless Steel</option>
        <option value="Aluminum">Aluminum</option>
      </select>
      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="filter-select"
      >
        <option value="all">Tất cả kích thước</option>
        <option value="38">38 mm</option>
        <option value="40">40 mm</option>
        <option value="42">42 mm</option>
      </select>
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="filter-select"
      >
        <option value="all">Tất cả giá</option>
        <option value="low">Dưới 100,000,000 ₫</option>
        <option value="high">Trên 100,000,000 ₫</option>
      </select>
      <select
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="filter-select"
      >
        <option value="all">Tất cả đánh giá</option>
        <option value="5">5 sao trở lên</option>
        <option value="4">4 sao trở lên</option>
        <option value="3">3 sao trở lên</option>
        <option value="2">2 sao trở lên</option>
        <option value="1">1 sao trở lên</option>
      </select>
      <select
        value={sold}
        onChange={(e) => setSold(e.target.value)}
        className="filter-select"
      >
        <option value="all">Tất cả số lượng bán</option>
        <option value="1000">Trên 1000</option>
        <option value="2000">Trên 2000</option>
        <option value="3000">Trên 3000</option>
      </select>
      <button onClick={resetFilters} className="reset-button">
        Bỏ chọn
      </button>
      <div className="watch-container">
        {filteredWatches.length > 0 ? (
          filteredWatches.map((watch) => (
            <div className="watch-card" key={watch.id}>
              <img src={`/images/${watch.image}`} alt={watch.name} />
              <h3>
                <Link to={`/watch/${watch.id}`}>{watch.name}</Link>
              </h3>
              <p>{watch.size} mm</p>
              <p className="price">
                {watch.price.toLocaleString()} ₫
              </p>
              <div className="watch-rating">
                <span className="star">&#9733;</span> {watch.review} • Đã bán{" "}
                {watch.sold}
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