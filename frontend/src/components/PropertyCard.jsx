import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property._id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
        
        {/* Real Image */}
        <div className="h-44 bg-gray-300 overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0].url}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">
                No Image
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
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
            ₹{Number(property.price).toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;