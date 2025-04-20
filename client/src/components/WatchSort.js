

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = 'http://localhost:5000';

export default function WatchSort() {
  const [watches, setWatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Các state bộ lọc
  const [sortOrder, setSortOrder] = useState("asc");
  const [brand, setBrand] = useState("all");
  const [type, setType] = useState("all");
  const [material, setMaterial] = useState("all");
  const [size, setSize] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [review, setReview] = useState("all");
  const [sold, setSold] = useState("all");

  useEffect(() => {
    const fetchWatches = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/watch`);
        if (response.status === 200) {
          setWatches(response.data);
        } else {
          throw new Error("Lỗi khi tải dữ liệu");
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(err.message || "Không thể tải dữ liệu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatches();
  }, []);

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

  const filteredWatches = watches
    .filter((watch) =>
      (brand === "all" || watch.brand === brand) &&
      (type === "all" || watch.type === type) &&
      (material === "all" || watch.material === material) &&
      (size === "all" || watch.size === parseInt(size)) &&
      (priceRange === "all" ||
        (priceRange === "low" ? watch.price < 100000000 : watch.price >= 100000000)) &&
      (review === "all" || watch.review >= parseInt(review)) &&
      (sold === "all" || watch.sold >= parseInt(sold))
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  if (isLoading) {
    return <p className="text-center text-gray-500">Đang tải sản phẩm...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Lỗi: {error}</p>;
  }

  return (
    <div className="container mx-auto p-5">
      
      {/* Bộ lọc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
        >
          <option value="asc">Giá thấp đến cao</option>
          <option value="desc">Giá cao đến thấp</option>
        </select>
        
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
        >
          <option value="all">Tất cả thương hiệu</option>
          <option value="Rolex">Rolex</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
        </select>
        
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
        >
          <option value="all">Tất cả loại</option>
          <option value="Quartz">Quartz</option>
          <option value="Automatic">Automatic</option>
          <option value="Smartwatch">Smartwatch</option>
        </select>
        
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
        >
          <option value="all">Tất cả chất liệu</option>
          <option value="Stainless Steel">Stainless Steel</option>
          <option value="Aluminum">Aluminum</option>
        </select>
        
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
        >
          <option value="all">Tất cả kích thước</option>
          <option value="38">38 mm</option>
          <option value="40">40 mm</option>
          <option value="42">42 mm</option>
        </select>
        
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
        >
          <option value="all">Tất cả giá</option>
          <option value="low">Dưới 100,000,000 ₫</option>
          <option value="high">Trên 100,000,000 ₫</option>
        </select>
        
        <select
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
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
          className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
        >
          <option value="all">Tất cả số lượng bán</option>
          <option value="1000">Trên 1000</option>
          <option value="2000">Trên 2000</option>
          <option value="3000">Trên 3000</option>
        </select>
      </div>

      <button
        onClick={resetFilters}
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mb-8"
      >
        Bỏ chọn
      </button>

      {/* Hiển thị sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {filteredWatches.length > 0 ? (
          filteredWatches.map((watch) => (
            <div className="border border-gray-300 rounded p-3 bg-white shadow-sm group" key={watch._id}>
              <img
                className="w-full h-64 object-scale-down mb-2 transition-transform duration-200 hover:-translate-y-1"
                src={watch.image}
                alt={watch.name}
                onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.png"; }}
              />
              <h3 className="text-lg font-semibold text-gray-800 my-2">
                <Link to={`/watch/${watch._id}`} className="transition-colors duration-300 group-hover:text-blue-500">
                  {watch.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-600">{watch.size} mm</p>
              <p className="text-lg text-red-600 font-bold">
                {watch.price.toLocaleString()} ₫
              </p>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <span className="text-yellow-400 mr-1 text-lg">&#9733;</span>
                {watch.review} • Đã bán {watch.sold}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-base text-gray-500 mt-5">Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  );
}
