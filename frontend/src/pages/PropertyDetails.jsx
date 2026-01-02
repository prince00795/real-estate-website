import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const properties = [
  {
    id: 1,
    title: "2 BHK Apartment",
    location: "Pune",
    price: 3200000,
    type: "Apartment",
    description:
      "Spacious 2 BHK apartment with good ventilation, lift, and parking.",
  },
  {
    id: 2,
    title: "3 BHK Villa",
    location: "Bangalore",
    price: 8200000,
    type: "Villa",
    description:
      "Luxury 3 BHK villa with private garden, parking, and security.",
  },
  {
    id: 3,
    title: "1 BHK Flat",
    location: "Hyderabad",
    price: 2800000,
    type: "Flat",
    description:
      "Affordable 1 BHK flat suitable for small families and bachelors.",
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find(
    (p) => p.id === Number(id)
  );

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Property not found
        </h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* IMAGE GALLERY */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((img) => (
            <div
              key={img}
              className="h-56 bg-gray-300 flex items-center justify-center rounded"
            >
              <span className="text-gray-600">
                Image {img}
              </span>
            </div>
          ))}
        </div>

        {/* PROPERTY DETAILS */}
        <div className="bg-white p-6 rounded shadow">
          <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-2">
            {property.type}
          </span>

          <h1 className="text-3xl font-bold mb-2">
            {property.title}
          </h1>

          <p className="text-gray-600 mb-4">
            {property.location}
          </p>

          <p className="text-2xl font-bold text-blue-600 mb-4">
            ₹{property.price.toLocaleString()}
          </p>

          <p className="text-gray-700 mb-6">
            {property.description}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
              Call Owner
            </button>

            <button
              onClick={() => navigate(-1)}
              className="border px-6 py-3 rounded hover:bg-gray-100"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
