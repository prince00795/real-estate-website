import React from "react";
const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by city (Bangalore, Pune...)"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-1/2 p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;
