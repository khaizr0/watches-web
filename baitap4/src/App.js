import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import WatchDetail from "./components/WatchDetail";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WatchList />} />
        <Route path="/watch/:id" element={<WatchDetail />} />
      </Routes>
    </Router>
  );
}