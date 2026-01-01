import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        NoBrokerClone
      </Link>

      <div className="space-x-6 text-sm font-medium">
        <Link to="/" className="hover:text-blue-600">
          Buy
        </Link>
        <Link to="/post" className="hover:text-blue-600">
          Post Property
        </Link>
        <Link to="/login" className="hover:text-blue-600">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

