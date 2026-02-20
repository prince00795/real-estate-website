import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/properties"
      );
      setProperties(res.data.properties || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  const loadData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/properties"
      );
      setProperties(res.data.properties || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  loadData();
}, []);
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `http://localhost:8000/api/properties/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProperties();
    } catch (error) {
      alert("Delete failed",error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={() => navigate("/admin/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Property
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-semibold">
                {property.title}
              </h3>
              <p className="text-sm text-gray-600">
                {property.location}
              </p>
              <p className="text-blue-600 font-bold mt-2">
                ₹{property.price}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    navigate(`/admin/edit/${property._id}`)
                  }
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(property._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;