import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminAddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
    description: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
  setImages((prevImages) => [
    ...prevImages,
    ...Array.from(e.target.files),
  ]);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      await axios.post(
        "http://localhost:8000/api/properties",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Property Added Successfully");
      navigate("/admin/dashboard");

    } catch (error) {
      alert("Error adding property",error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-6">
            Add Property
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              name="type"
              placeholder="Type (Apartment/Villa)"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              rows="4"
            />

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded"
            >
              Add Property
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddProperty;