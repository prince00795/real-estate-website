import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Buy from "./pages/Buy";
import PostProperty from "./pages/PostProperty";
import PropertyDetails from "./pages/PropertyDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProperty from "./pages/AdminAddProperty";
import AdminEditProperty from "./pages/AdminEditProperty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/post" element={<PostProperty />} />
        <Route path="/property/:id" element={<PropertyDetails />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AdminAddProperty />} />
        <Route path="/admin/edit/:id" element={<AdminEditProperty />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
