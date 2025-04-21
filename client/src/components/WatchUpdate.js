import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WatchUpdate() {
  const [watchList, setWatchList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [review, setReview] = useState("");
  const [sold, setSold] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    fetch("https://watches-server.up.railway.app/api/watch")
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => setWatchList(data))
      .catch((err) => console.error("Error fetching watches:", err));
  }, []);

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
    setCurrentImage(`https://watches-server.up.railway.app/uploads/${watch.image}`);
    setImage(null);
  };

  const predictedId = (() => {
    const newOrder = watchList.length + 1;
    const orderStr = String(newOrder).padStart(3, "0");
    let typeCode = "";
    if (type.toLowerCase() === "quartz") {
      typeCode = "QUA";
    } else if (type.toLowerCase() === "automatic") {
      typeCode = "AUT";
    } else if (type.toLowerCase() === "smartwatch") {
      typeCode = "SMA";
    }
    return `WATCH${typeCode}${orderStr}`;
  })();

  const checkSaveButton = () => {
    console.log("Debug: Kiểm tra nút Lưu");
    console.log({ name, brand, type, material, size, price, review, sold, image });
    let missingFields = [];
    if (!name) missingFields.push("name");
    if (!brand) missingFields.push("brand");
    if (!type) missingFields.push("type");
    if (!material) missingFields.push("material");
    if (!size) missingFields.push("size");
    if (!price) missingFields.push("price");
    if (!review) missingFields.push("review");
    if (!sold) missingFields.push("sold");
    if (missingFields.length > 0) {
      console.log("Missing fields: ", missingFields.join(", "));
      return false;
    }
    console.log("Tất cả trường đã được nhập. Sẵn sàng lưu!");
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!checkSaveButton()) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    console.log("handleSave called", { editingId, name, brand, type, material, size, price, review, sold, image });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("type", type);
    formData.append("material", material);
    formData.append("size", size);
    formData.append("price", price);
    formData.append("review", review);
    formData.append("sold", sold);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`https://watches-server.up.railway.app/api/watch/${editingId}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert("Lỗi cập nhật: " + errorData.error);
        return;
      }
      const updatedData = await res.json();
      const updatedList = watchList.map((w) => (w.id === editingId ? updatedData : w));
      setWatchList(updatedList);
      setEditingId(null);
      console.log("Cập nhật thành công:", updatedData);
    } catch (error) {
      console.error("Error updating watch:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  if (editingId !== null) {
    return (
      <div className="container mx-auto p-5">
        <h2 className="text-center text-2xl font-bold mb-5">Chỉnh sửa sản phẩm</h2>
        <form onSubmit={handleSave} className="max-w-lg mx-auto space-y-4">
          <input
            type="text"
            placeholder="Mã sản phẩm"
            value={predictedId}
            readOnly
            className="p-2.5 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Thương hiệu"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          >
            <option value="Quartz">Quartz</option>
            <option value="Automatic">Automatic</option>
            <option value="Smartwatch">Smartwatch</option>
          </select>
          <input
            type="text"
            placeholder="Chất liệu"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Kích thước"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Đánh giá"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Số lượng bán"
            value={sold}
            onChange={(e) => setSold(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg w-full"
          />
          <div className="flex flex-col">
            <span className="mb-1">Hình ảnh hiện tại:</span>
            {currentImage && (
              <img
                src={currentImage}
                alt="Hiện tại"
                className="w-32 h-32 object-contain mb-2"
              />
            )}
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              className="p-2.5 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          >
            Lưu
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
          >
            Quay lại
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-500 underline">
            Quay về Trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-2xl font-bold mb-5">Chọn sản phẩm để cập nhật</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {watchList.length > 0 ? (
          watchList.map((watch) => (
            <div
              key={watch.id}
              className="border border-gray-300 rounded p-3 bg-white shadow-sm group"
            >
              <img
                className="w-full h-64 object-scale-down mb-2"
                src={`https://watches-server.up.railway.app/uploads/${watch.image}`}
                alt={watch.name}
              />
              <h3 className="text-lg font-semibold text-gray-800 my-2">{watch.name}</h3>
              <p className="text-sm text-gray-600">{watch.size} mm</p>
              <p className="text-lg text-red-600 font-bold">{watch.price.toLocaleString()} ₫</p>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <span className="text-yellow-400 mr-1">&#9733;</span>
                {watch.review} • Đã bán {watch.sold}
              </div>
              <button
                type="button"
                onClick={() => handleEditClick(watch)}
                className="mt-3 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
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
