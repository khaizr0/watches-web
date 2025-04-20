


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import WatchFind from "./components/WatchFind";
import WatchSort from "./components/WatchSort";
import WatchDetail from "./components/WatchDetail";
import WatchAdd from "./components/WatchAdd";
import WatchUpdate from "./components/WatchUpdate";
import WatchDelete from "./components/WatchDelete";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Routes>
                <Route path="/" element={<WatchList />} />
                <Route path="/find" element={<WatchFind />} />
                <Route path="/sort" element={<WatchSort />} />
                <Route path="/watch/:id" element={<WatchDetail />} />
                <Route path="/add" element={<WatchAdd />} />
                <Route path="/update" element={<WatchUpdate />} />
                <Route path="/delete" element={<WatchDelete />} />
                  <Route path="*" element={<div><h2>404 Not Found</h2></div>} />
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
