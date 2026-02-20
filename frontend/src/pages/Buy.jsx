import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import PropertyCard from "../components/PropertyCard";
import PriceFilter from "../components/PriceFilter";

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/properties"
        );
        setProperties(res.data.properties);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, []);

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

        <SearchBar search={search} setSearch={setSearch} />

        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))
          ) : (
            <p className="text-gray-500">
              No properties found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Buy;