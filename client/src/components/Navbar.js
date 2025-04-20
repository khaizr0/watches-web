import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white no-underline text-xl font-bold hover:text-gray-300" to="/">
          WatchStore
        </Link>

        {isAuthenticated ? (
          <>
            <ul className="list-none flex items-center m-0 p-0">
              <li className="mx-3">
                <Link
                  className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-700 hover:rounded hover:scale-105"
                  to="/"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="mx-3">
                <Link
                  className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-700 hover:rounded hover:scale-105"
                  to="/find"
                >
                  Tìm kiếm
                </Link>
              </li>
              <li className="mx-3">
                <Link
                  className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-700 hover:rounded hover:scale-105"
                  to="/sort"
                >
                  Lọc sản phẩm
                </Link>
              </li>
              <li className="mx-3">
                <Link
                  className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-700 hover:rounded hover:scale-105"
                  to="/add"
                >
                  Thêm sản phẩm
                </Link>
              </li>
              <li className="mx-3">
                <Link
                  className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-700 hover:rounded hover:scale-105"
                  to="/update"
                >
                  Cập nhật sản phẩm
                </Link>
              </li>
              <li className="mx-3">
                <Link
                  className="text-white no-underline text-lg p-2 transition transform duration-300 hover:bg-gray-700 hover:rounded hover:scale-105"
                  to="/delete"
                >
                  Xóa sản phẩm
                </Link>
              </li>
            </ul>

            <ul className="list-none flex items-center m-0 p-0">
              {user && (
                <li className="mx-3">
                  <span className="text-gray-300 text-lg">Chào, {user.username}!</span>
                </li>
              )}
              <li className="mx-3">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Đăng xuất
                </button>
              </li>
            </ul>
          </>
        ) : (
          <div>
            <Link
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              to="/login"
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
