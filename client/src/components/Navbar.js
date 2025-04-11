import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-2">
      <ul className="list-none flex justify-center items-center m-0 p-0">
        <li className="mx-4">
          <Link
            className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-600 hover:rounded hover:scale-105"
            to="/"
          >
            Trang chủ
          </Link>
        </li>
        <li className="mx-4">
          <Link
            className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-600 hover:rounded hover:scale-105"
            to="/find"
          >
            Tìm kiếm
          </Link>
        </li>
        <li className="mx-4">
          <Link
            className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-600 hover:rounded hover:scale-105"
            to="/sort"
          >
            Lọc sản phẩm
          </Link>
        </li>
        <li className="mx-4">
          <Link
            className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-600 hover:rounded hover:scale-105"
            to="/add"
          >
            Thêm sản phẩm
          </Link>
        </li>
        <li className="mx-4">
          <Link
            className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-600 hover:rounded hover:scale-105"
            to="/update"
          >
            Cập nhật sản phẩm
          </Link>
        </li>
        <li className="mx-4">
          <Link
            className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-600 hover:rounded hover:scale-105"
            to="/delete"
          >
            Xóa sản phẩm
          </Link>
        </li>
      </ul>
    </nav>
  );
}
