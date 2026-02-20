import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      
      {/* Logo / Home */}
      <Link
        to="/"
        className="text-xl font-bold text-blue-600"
      >
        NoBrokerClone
      </Link>

      {/* Menu */}
      <div className="space-x-6 text-sm font-medium flex items-center">
        
        {/* ✅ HOME BUTTON */}
        <Link
          to="/"
          className="hover:text-blue-600"
        >
          Home
        </Link>

        <Link
          to="/buy"
          className="hover:text-blue-600"
        >
          Buy
        </Link>

        <Link
          to="/post"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Post Property
        </Link>

        <Link
          to="/admin/login"
          className="hover:text-blue-600"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
