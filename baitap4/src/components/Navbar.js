import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Trang chủ</Link></li>
      </ul>
    </nav>
  );
}
