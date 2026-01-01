import React from "react";
const PriceFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default PriceFilter;
