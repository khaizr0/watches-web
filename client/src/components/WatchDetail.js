import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function WatchDetail() {
  const { id } = useParams();
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatch = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/watch/${id}`);
        if (response.ok) {
          const data = await response.json();
          setWatch(data);
        } else {
          console.error("Không tìm thấy sản phẩm:", response.status);
        }
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white border border-gray-300 rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{watch.name}</h1>
      <img
        src={watch.image.startsWith("http") ? watch.image : `/images/${watch.image}`}
        alt={watch.name}
        className="w-64 h-auto mx-auto rounded-md mb-4"
      />
      <p className="text-gray-600 text-lg mb-2">Thương hiệu: {watch.brand}</p>
      <p className="text-gray-600 text-lg mb-2">Loại: {watch.type}</p>
      <p className="text-gray-600 text-lg mb-2">Chất liệu: {watch.material}</p>
      <p className="text-gray-600 text-lg mb-2">Kích thước: {watch.size} mm</p>
      <p className="text-gray-600 text-lg mb-2">Giá: {watch.price.toLocaleString()} ₫</p>
      <p className="text-gray-600 text-lg mb-2">Đánh giá: {watch.review}</p>
      <p className="text-gray-600 text-lg mb-2">Đã bán: {watch.sold}</p>
      <Link
        to="/"
        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Trở về
      </Link>
    </div>
  );
}
