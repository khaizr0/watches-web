import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatches = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/watch`);
        if (response.status === 200) {
          setWatchList(response.data);
        } else {
          throw new Error(`Failed to fetch watches. Status: ${response.status}`);
        }
      } catch (err) {
        console.error("Error fetching watch list:", err);
        setError(err.message || "Could not load watches. Please try again later.");
        setWatchList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatches();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-5 text-center">
        <p className="text-lg text-gray-600">Loading watches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-5 text-center">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-2xl font-bold mb-5">Danh sách đồng hồ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {watchList.length > 0 ? (
          watchList.map((watch) => (
            <div className="border border-gray-300 rounded p-3 bg-white shadow-sm group" key={watch.id}>
              <img
                className="w-full h-64 object-scale-down mb-2 transition-transform duration-200 hover:-translate-y-1"
                src={watch.image}
                alt={watch.name}
                onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.png"; }}
              />
              <h3 className="text-lg font-semibold text-gray-800 my-2">
                <Link to={`/watch/${watch.id}`} className="transition-colors duration-300 group-hover:text-blue-500">
                  {watch.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-600">{watch.size} mm</p>
              <p className="text-lg text-red-600 font-bold">
                {typeof watch.price === 'number' ? watch.price.toLocaleString() : 'N/A'} ₫
              </p>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <span className="text-yellow-400 mr-1 text-lg">★</span> {watch.review} • Đã bán {watch.sold}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-base text-gray-500 mt-5">Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
}