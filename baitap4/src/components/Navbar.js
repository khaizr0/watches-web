import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/find">Tìm kiếm</Link></li>
        <li><Link to="/sort">Lọc sản phẩm</Link></li>
        <li><Link to="/add">Thêm sản phẩm</Link></li>
        <li><Link to="/update">Cập nhật sản phẩm</Link></li>
        <li><Link to="/delete">Xóa sản phẩm</Link></li>
      </ul>
    </nav>
  );
}