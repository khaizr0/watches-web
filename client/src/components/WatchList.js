import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function WatchDelete() {
  const [watches, setWatches] = useState([]);
  const [displayedWatches, setDisplayedWatches] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 10;

  // Fetch full list of watches from server
  useEffect(() => {
    fetch("http://localhost:5000/api/watch")
      .then((res) => {
        if (!res.ok) throw new Error("Không thể lấy danh sách sản phẩm");
        return res.json();
      })
      .then((data) => {
        setWatches(data);
        // Initialize displayed items
        const initial = data.slice(0, ITEMS_PER_PAGE);
        setDisplayedWatches(initial);
        setHasMore(data.length > ITEMS_PER_PAGE);
      })
      .catch((err) => console.error("Error fetching watches:", err));
  }, []);

  // Load more items on scroll
  const fetchMoreData = () => {
    const nextBatch = watches.slice(
      displayedWatches.length,
      displayedWatches.length + ITEMS_PER_PAGE
    );
    setDisplayedWatches((prev) => [...prev, ...nextBatch]);
    if (displayedWatches.length + nextBatch.length >= watches.length) {
      setHasMore(false);
    }
  };

  // Handle deletion of a watch
  const handleRemove = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/watch/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const errorData = await res.json();
          alert("Lỗi xóa: " + errorData.message);
          return;
        }
        // Remove from both full list and displayed list
        setWatches((prev) => prev.filter((watch) => watch.id !== id));
        setDisplayedWatches((prev) => prev.filter((watch) => watch.id !== id));
      } catch (error) {
        console.error("Error deleting watch:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Chọn sản phẩm để xóa</h1>

      {displayedWatches.length > 0 ? (
        <InfiniteScroll
          dataLength={displayedWatches.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center my-4">Đang tải thêm sản phẩm 🔎</h4>}
          endMessage={
            <p className="text-center mt-5">
              <b>Đã tải hết sản phẩm 😅</b>
            </p>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            {displayedWatches.map((watch) => (
              <div key={watch.id} className="border p-4 rounded-lg shadow">
                <h2 className="text-lg font-medium">{watch.name}</h2>
                <p className="mt-2">{watch.size} mm</p>
                <p className="mt-1">{watch.price.toLocaleString()} ₫</p>
                <p className="mt-1">
                  ★ {watch.review} • Đã bán {watch.sold}
                </p>
                <button
                  onClick={() => handleRemove(watch.id)}
                  className="mt-3 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <p className="text-center text-gray-500">Không tìm thấy sản phẩm</p>
      )}
    </div>
  );
}