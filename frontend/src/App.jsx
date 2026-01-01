import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Buy from "./pages/Buy";
import PostProperty from "./pages/PostProperty";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/post" element={<PostProperty />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
