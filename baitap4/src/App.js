import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import WatchDetail from "./components/WatchDetail";
import WatchDelete from "./components/WatchDelete";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WatchList />} />
        <Route path="/watch/:id" element={<WatchDetail />} />
        <Route path="/watch/:id/edit" element={<WatchDelete />} />
      </Routes>
    </Router>
  );
}