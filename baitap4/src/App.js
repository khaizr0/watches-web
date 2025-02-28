// App.js
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
import WatchListUpdate from "./components/WatchListUpdate";
import WatchListDelete from "./components/WatchListDelete";

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
        <Route path="/update" element={<WatchListUpdate />} />
        <Route path="/delete" element={<WatchListDelete />} />
      </Routes>
    </Router>
  );
}
