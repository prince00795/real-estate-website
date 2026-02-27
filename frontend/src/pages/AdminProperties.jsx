import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

   

  useEffect(() => {
  const loadProperties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/properties"
      );
      setProperties(res.data.properties);
    } catch (error) {
      console.log(error);
    }
  };

  loadProperties();
}, []);

  const handleDelete = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(
      `http://localhost:8000/api/properties/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // reload properties safely
    setProperties((prev) =>
      prev.filter((property) => property._id !== id)
    );

  } catch (error) {
    alert("Delete failed",error);
  }
};

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">All Properties</h2>
          <button
            onClick={() => navigate("/admin/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Property
          </button>
        </div>

        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Location</th>
                <th className="p-3">Price</th>
                <th className="p-3">Type</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id} className="border-b">
                  <td className="p-3">{property.title}</td>
                  <td className="p-3">{property.location}</td>
                  <td className="p-3">₹{property.price}</td>
                  <td className="p-3">{property.type}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit/${property._id}`)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminProperties;