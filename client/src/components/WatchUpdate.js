import React, { useState } from "react";
import watches from "../Data";

export default function WatchUpdate() {
  // Tạo state cho danh sách sản phẩm (lấy từ Data.js)
  const [watchList, setWatchList] = useState([...watches]);
  // State để xác định xem đang chỉnh sửa sản phẩm nào (null = không chỉnh sửa)
  const [editingId, setEditingId] = useState(null);

  // Các state cho form chỉnh sửa
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [review, setReview] = useState("");
  const [sold, setSold] = useState("");
  const [image, setImage] = useState("");

  // Hàm gọi khi bấm "Cập nhật" trên 1 sản phẩm
  const handleEditClick = (watch) => {
    setEditingId(watch.id);
    setName(watch.name);
    setBrand(watch.brand);
    setType(watch.type);
    setMaterial(watch.material);
    setSize(watch.size);
    setPrice(watch.price);
    setReview(watch.review);
    setSold(watch.sold);
    setImage(watch.image);
  };

  // Hàm lưu thay đổi
  const handleSave = () => {
    const updatedList = watchList.map((w) => {
      if (w.id === editingId) {
        return {
          ...w,
          name,
          brand,
          type,
          material,
          size: parseInt(size),
          price: parseInt(price),
          review: parseFloat(review),
          sold: parseInt(sold),
          image,
        };
      }
      return w;
    });
    setWatchList(updatedList);
    setEditingId(null);
  };

  // Hàm hủy chỉnh sửa, quay lại danh sách
  const handleCancel = () => {
    setEditingId(null);
  };

  // Nếu đang chỉnh sửa, render form chỉnh sửa
  if (editingId !== null) {
    return (
      <div className="container mx-auto p-5">
        <h2 className="text-center text-2xl font-bold mb-5">Chỉnh sửa sản phẩm</h2>
        <div className="max-w-lg mx-auto space-y-4">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Thương hiệu"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Loại"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Chất liệu"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Kích thước"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Đánh giá"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Số lượng bán"
            value={sold}
            onChange={(e) => setSold(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Hình ảnh"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full outline-none transition-colors duration-300 focus:border-blue-500"
          />
        </div>
        <div className="max-w-lg mx-auto mt-6 flex space-x-4">
          <button
            onClick={handleSave}
            className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            Lưu
          </button>
          <button
            onClick={handleCancel}
            className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  // Nếu không chỉnh sửa, render danh sách sản phẩm
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-2xl font-bold mb-5">Chọn sản phẩm để cập nhật</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {watchList.length > 0 ? (
          watchList.map((watch) => (
            <div className="border border-gray-300 rounded p-3 bg-white shadow-sm group" key={watch.id}>
              <img
                className="w-full h-64 object-scale-down mb-2 transition-transform duration-200 hover:-translate-y-1"
                src={`/images/${watch.image}`}
                alt={watch.name}
              />
              <h3 className="text-lg font-semibold text-gray-800 my-2">{watch.name}</h3>
              <p className="text-sm text-gray-600">{watch.size} mm</p>
              <p className="text-lg text-red-600 font-bold">
                {watch.price.toLocaleString()} ₫
              </p>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <span className="text-yellow-400 mr-1 text-lg">&#9733;</span>{" "}
                {watch.review} • Đã bán {watch.sold}
              </div>
              <button
                onClick={() => handleEditClick(watch)}
                className="mt-3 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Cập nhật
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-base text-gray-500 mt-5">Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  );
}
