import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import WatchDetail from "./components/WatchDetail";
import WatchDelete from "./components/WatchDelete";
import WatchEdit from "./components/WatchEdit"; // Import the WatchEdit component
import WatchAdd from "./components/WatchAdd"; // Import the WatchAdd component

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WatchList />} />
        <Route path="/watch/:id" element={<WatchDetail />} />
        <Route path="/watch/:id/edit" element={<WatchEdit />} /> {/* Use WatchEdit component */}
        <Route path="/watch/:id/delete" element={<WatchDelete />} /> {/* Add a route for deleting a watch */}
        <Route path="/add" element={<WatchAdd />} /> {/* Add a route for adding a new watch */}
      </Routes>
    </Router>
  );
}