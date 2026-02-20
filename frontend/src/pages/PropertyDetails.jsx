import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/properties/${id}`
        );
        setProperty(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading...
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
          {property.images.map((img) => (
            <div
              key={img.public_id}
              className="h-56 rounded overflow-hidden"
            >
              <img
                src={img.url}
                alt="property"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

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
            ₹{Number(property.price).toLocaleString()}
          </p>

          <p className="text-gray-700 mb-6">
            {property.description}
          </p>

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