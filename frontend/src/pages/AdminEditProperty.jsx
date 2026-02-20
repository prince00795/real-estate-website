import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
    description: "",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/properties/${id}`
        );

        setFormData({
          title: res.data.title,
          location: res.data.location,
          price: res.data.price,
          type: res.data.type,
          description: res.data.description,
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchProperty();
  }, [id]);

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
      await axios.put(
        `http://localhost:8000/api/properties/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Property Updated Successfully");
      navigate("/admin/dashboard");

    } catch (error) {
      alert("Update failed",error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-6">
            Edit Property
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <textarea
              name="description"
              value={formData.description}
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
              className="w-full bg-yellow-600 text-white py-3 rounded"
            >
              Update Property
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminEditProperty;