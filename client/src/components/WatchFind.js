import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

export default function WatchFind() {
  const [searchTerm, setSearchTerm] = useState("");
  const [watches, setWatches] = useState([]);            
  const batchSize = 10;
  const [displayedWatches, setDisplayedWatches] = useState([]);

  useEffect(() => {
    fetch("https://watches-server.up.railway.app/api/watch")
      .then(res => {
        if (!res.ok) throw new Error("Lỗi mạng khi lấy watch");
        return res.json();
      })
      .then(data => {
        setWatches(data);
        setDisplayedWatches(data.slice(0, batchSize));
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const newFiltered = watches.filter((watch) =>
      watch.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedWatches(newFiltered.slice(0, batchSize));
  }, [searchTerm, watches]);

  const filteredWatches = watches.filter((watch) =>
    watch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchMoreData = () => {
    const nextItems = filteredWatches.slice(
      displayedWatches.length,
      displayedWatches.length + batchSize
    );
    setDisplayedWatches((prev) => [...prev, ...nextItems]);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-2xl font-bold mb-5">Tìm kiếm đồng hồ</h1>
      <InputGroup className="mb-5 justify-center">
        <Form.Control
          type="text"
          placeholder="Nhập tên sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full max-w-[400px] mx-auto p-2.5 border border-gray-300 rounded-lg text-base outline-none transition-colors duration-300 focus:border-[#007bff]"
        />
      </InputGroup>
      <InfiniteScroll
        dataLength={displayedWatches.length}
        next={fetchMoreData}
        hasMore={displayedWatches.length < filteredWatches.length}
        loader={<h4 className="text-center">Đang tải thêm sản phẩm 🔎</h4>}
        endMessage={
          <p className="text-center mt-5">
            <b>Đã tải hết sản phẩm 😅</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {displayedWatches.length > 0 ? (
            displayedWatches.map((watch) => (
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
                  <Link
                    to={`/watch/${watch.id}`}
                    className="transition-colors duration-300 group-hover:text-blue-500"
                  >
                    {watch.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600">{watch.size} mm</p>
                <p className="text-lg text-red-600 font-bold">
                  {watch.price.toLocaleString()} ₫
                </p>
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  <span className="text-yellow-400 mr-1 text-lg">
                    &#9733;
                  </span>{" "}
                  {watch.review} • Đã bán {watch.sold}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-base text-gray-500 mt-5">
              Không tìm thấy sản phẩm
            </p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
