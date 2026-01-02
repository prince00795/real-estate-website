import React from "react";
import { Link } from "react-router-dom";

 

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      
      {/* Image Placeholder */}
      <div className="h-44 bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600 text-sm">Property Image</span>
      </div>

      <div className="p-4">
        {/* Badge */}
        <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-2">
          {property.type || "Property"}
        </span>

        <h2 className="text-lg font-semibold">
          {property.title}
        </h2>

        <p className="text-gray-600 text-sm">
          {property.location}
        </p>

        <p className="text-blue-600 font-bold mt-2">
          ₹{property.price.toLocaleString()}
        </p>

        <Link
          to={`/property/${property.id}`}
          className="inline-block mt-4 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
