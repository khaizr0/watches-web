import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import WatchFind from "./components/WatchFind";
import WatchSort from "./components/WatchSort";
import WatchDetail from "./components/WatchDetail";
import WatchDelete from "./components/WatchDelete";
import WatchEdit from "./components/WatchEdit";
import WatchAdd from "./components/WatchAdd";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WatchList />} />
        <Route path="/find" element={<WatchFind />} />
        <Route path="/sort" element={<WatchSort />} />
        <Route path="/watch/:id" element={<WatchDetail />} />
        <Route path="/watch/:id/edit" element={<WatchEdit />} />
        <Route path="/watch/:id/delete" element={<WatchDelete />} />
        <Route path="/add" element={<WatchAdd />} />
        <Route path="/update" element={<WatchList mode="update" />} />
        <Route path="/delete" element={<WatchList mode="delete" />} />
      </Routes>
    </Router>
  );
}