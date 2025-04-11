import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import WatchFind from "./components/WatchFind";
import WatchSort from "./components/WatchSort";
import WatchDetail from "./components/WatchDetail";
import WatchAdd from "./components/WatchAdd";
import WatchUpdate from "./components/WatchUpdate";
import WatchDelete from "./components/WatchDelete";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WatchList />} />
        <Route path="/find" element={<WatchFind />} />
        <Route path="/sort" element={<WatchSort />} />
        <Route path="/watch/:id" element={<WatchDetail />} />
        <Route path="/add" element={<WatchAdd />} />
        <Route path="/update" element={<WatchUpdate />} />
        <Route path="/delete" element={<WatchDelete />} />
      </Routes>
    </Router>
  );
}
