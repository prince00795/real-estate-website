import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
 
const featuredProperties = [
  {
    id: 1,
    title: "2 BHK Apartment",
    location: "Pune",
    price: 3200000,
  },
  {
    id: 2,
    title: "3 BHK Villa",
    location: "Bangalore",
    price: 8200000,
  },
  {
    id: 3,
    title: "1 BHK Flat",
    location: "Hyderabad",
    price: 2800000,
  },
];

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

      {/* ================= HERO + CONTACT ================= */}
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

      {/* ================= EXPLORE PROPERTY ================= */}
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

      {/* ================= WHY CHOOSE US ================= */}
      <div className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Us
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6 text-center">
          {["Zero Brokerage", "Verified Owners", "Fast Response", "Local Experts"].map(
            (item, index) => (
              <div key={index} className="bg-white p-6 rounded shadow">
                <h3 className="font-semibold">{item}</h3>
              </div>
            )
          )}
        </div>
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <div className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <div>
            <h3 className="font-semibold mb-2">1. Post Property</h3>
            <p className="text-gray-600 text-sm">
              Share basic details for free
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Get Calls</h3>
            <p className="text-gray-600 text-sm">
              Buyers contact you directly
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Close Deal</h3>
            <p className="text-gray-600 text-sm">
              Finalize without brokerage
            </p>
          </div>
        </div>
      </div>

      {/* ================= FEATURED PROPERTIES ================= */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Featured Properties
            </h2>
            <button
              onClick={() => navigate("/buy")}
              className="text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProperties.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-gray-600 text-sm">{p.location}</p>
                <p className="text-blue-600 font-bold mt-2">
                  ₹{p.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FINAL CTA ================= */}
      <div className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Own a Property?
        </h2>
        <p className="mb-6">
          Post it for FREE and get genuine buyers
        </p>
        <button
          onClick={() => navigate("/post")}
          className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100"
        >
          Post Property Now
        </button>
      </div>
    </>
  );
};

export default Home;
