import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition p-4">
      <h2 className="text-lg font-semibold">{property.title}</h2>

      <p className="text-gray-600 text-sm">{property.location}</p>

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
  );
};

export default PropertyCard;
