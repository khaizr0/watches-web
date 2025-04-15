import React, { useState } from "react";
import { Link } from "react-router-dom";
import watches from "../Data";

export default function WatchList() {
  const [watchList] = useState(watches);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-2xl font-bold mb-5">Danh sách đồng hồ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {watchList.length > 0 ? (
          watchList.map((watch) => (
            <div className="border border-gray-300 rounded p-3 bg-white shadow-sm group" key={watch.id}>
              <img
                className="w-full h-64 object-scale-down mb-2 transition-transform duration-200 hover:-translate-y-1"
                src={`/images/${watch.image}`}
                alt={watch.name}
              />
              <h3 className="text-lg font-semibold text-gray-800 my-2">
                <Link to={`/watch/${watch.id}`} className="transition-colors duration-300 group-hover:text-blue-500">
                  {watch.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-600">{watch.size} mm</p>
              <p className="text-lg text-red-600 font-bold">{watch.price.toLocaleString()} ₫</p>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <span className="text-yellow-400 mr-1 text-lg">&#9733;</span> {watch.review} • Đã bán {watch.sold}
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
