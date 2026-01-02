import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import PropertyCard from "../components/PropertyCard";
import PriceFilter from "../components/PriceFilter";
  
 

const properties = [
  {
    id: 1,
    title: "2 BHK Apartment",
    location: "Bangalore",
    price: 5500000,
    type: "Apartment",
  },
  {
    id: 2,
    title: "3 BHK Villa",
    location: "Hyderabad",
    price: 8200000,
    type: "Villa",
  },
  {
    id: 3,
    title: "1 BHK Flat",
    location: "Pune",
    price: 3200000,
    type: "Flat",
  },
  {
    id: 1,
    title: "2 BHK Apartment",
    location: "Bangalore",
    price: 5500000,
    type: "Apartment",
  },
  {
    id: 2,
    title: "3 BHK Villa",
    location: "Hyderabad",
    price: 8200000,
    type: "Villa",
  },
  {
    id: 3,
    title: "1 BHK Flat",
    location: "Pune",
    price: 3200000,
    type: "Flat",
  },
  {
    id: 1,
    title: "2 BHK Apartment",
    location: "Bangalore",
    price: 5500000,
    type: "Apartment",
  },
  {
    id: 2,
    title: "3 BHK Villa",
    location: "Hyderabad",
    price: 8200000,
    type: "Villa",
  },
  {
    id: 3,
    title: "1 BHK Flat",
    location: "Pune",
    price: 3200000,
    type: "Flat",
  },
  
];


const Buy = () => {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProperties = properties.filter((p) => {
    const matchLocation = p.location
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchMin = minPrice ? p.price >= Number(minPrice) : true;
    const matchMax = maxPrice ? p.price <= Number(maxPrice) : true;

    return matchLocation && matchMin && matchMax;
  });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">Buy Property</h1>

        {/* Search */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* Price Filter */}
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />

        {/* Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p className="text-gray-500">No properties found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Buy;
