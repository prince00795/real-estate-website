import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";

const PostProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    propertyType: "Apartment",
    purpose: "Rent",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Posted Property:", formData);

    alert("Property submitted successfully! We will contact you.");

    setFormData({
      name: "",
      phone: "",
      city: "",
      propertyType: "Apartment",
      purpose: "Rent",
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          
          {/* LEFT INFO */}
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Post Your Property for Free
            </h1>

            <p className="text-gray-600 mb-6">
              Reach genuine buyers & tenants without paying brokerage.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Zero  Brokerage</li>
              <li>✔ Direct owner-to-buyer contact</li>
              <li>✔ Faster responses</li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Property Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Owner Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />

              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option>Apartment</option>
                <option>Independent House</option>
                <option>Villa</option>
                <option>Land/Plot</option>
              </select>

              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option>Rent</option>
                <option>Sell</option>
              </select>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
              >
                Submit Property
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostProperty;
