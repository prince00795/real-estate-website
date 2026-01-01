import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
  });

  const [exploreCity, setExploreCity] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Details:", formData);
    alert("Thanks! We will contact you soon.");
    setShowForm(false);
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">
          
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Sell or Rent your Property for Free
            </h1>

            <ul className="text-gray-700 mb-6 space-y-2">
              <li>✔ Zero Brokerage</li>
              <li>✔ Faster Buyers & Tenants</li>
              <li>✔ Direct Contact</li>
            </ul>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Contact Us
            </button>
          </div>

          {/* RIGHT CONTACT FORM */}
          {showForm && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">
                Get a Call Back
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* EXPLORE PROPERTY SECTION */}
      <div className="py-16 bg-white">
        <div className="max-w-xl mx-auto text-center px-6">
          <h2 className="text-2xl font-bold mb-4">
            Explore Properties
          </h2>

          <select
            value={exploreCity}
            onChange={(e) => setExploreCity(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          >
            <option value="">Select City</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
             

          </select>

          <button
            onClick={() => navigate(`/buy?city=${exploreCity}`)}
            disabled={!exploreCity}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Explore Properties
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
