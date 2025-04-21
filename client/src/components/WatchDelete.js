import React, { useState, useEffect } from "react";

export default function WatchDelete() {
  const [watches, setWatches] = useState([]);

  // Load danh sách sản phẩm từ server thông qua GET endpoint
  useEffect(() => {
    fetch("https://watches-server.up.railway.app/api/watch")
      .then((res) => {
        if (!res.ok) throw new Error("Không thể lấy danh sách sản phẩm");
        return res.json();
      })
      .then((data) => setWatches(data))
      .catch((err) => console.error("Error fetching watches:", err));
  }, []);

  // Hàm xử lý xóa sản phẩm bằng cách gọi DELETE endpoint
  const handleRemove = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const res = await fetch(`https://watches-server.up.railway.app/api/watch/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const errorData = await res.json();
          alert("Lỗi xóa: " + errorData.message);
          return;
        }
        // Nếu xóa thành công, cập nhật lại danh sách sản phẩm trong state
        setWatches((prevWatches) => prevWatches.filter((watch) => watch.id !== id));
      } catch (error) {
        console.error("Error deleting watch:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-2xl font-bold mb-5">
        Chọn sản phẩm để xóa
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {watches.length > 0 ? (
          watches.map((watch) => (
            <div
              key={watch.id}
              className="border border-gray-300 rounded p-3 bg-white shadow-sm group"
            >
              <img
                className="w-full h-64 object-scale-down mb-2 transition-transform duration-200 hover:-translate-y-1"
                src={`https://watches-server.up.railway.app/uploads/${watch.image}`}
                alt={watch.name}
              />
              <h3 className="text-lg font-semibold text-gray-800 my-2">
                {watch.name}
              </h3>
              <p className="text-sm text-gray-600">{watch.size} mm</p>
              <p className="text-lg text-red-600 font-bold">
                {watch.price.toLocaleString()} ₫
              </p>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <span className="text-yellow-400 mr-1 text-lg">&#9733;</span>
                {watch.review} • Đã bán {watch.sold}
              </div>
              <button
                onClick={() => handleRemove(watch.id)}
                className="mt-3 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Xóa
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-base text-gray-500 mt-5">
            Không tìm thấy sản phẩm
          </p>
        )}
      </div>
    </div>
  );
}
