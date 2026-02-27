import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
  });

   

  // ✅ Fetch real properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/properties"
        );

        setFeaturedProperties(res.data.properties); // because backend returns { properties: [...] }

      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // WhatsApp + Lead Save
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/leads",
        formData
      );

      const message = `
Hi, I am ${formData.name}.
I am from ${formData.city}.
My phone number is ${formData.phone}.
I am interested in your property services.
      `;

      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "919955813612";

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
        "_blank"
      );

    } catch (error) {
      alert("Something went wrong. Please try again.",error);
    }
  };

  return (
    <>
      <Navbar />

      {/* ================= HERO + CONTACT ================= */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">

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
                  pattern="[0-9]{10}"
                  maxLength="10"
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

          <div className="slider-container">
            <div className="slider-track">
              {[...featuredProperties, ...featuredProperties].map((p, index) => (
                <div
                  key={`${p._id}-${index}`}
                  onClick={() => navigate(`/property/${p._id}`)}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden mr-6 w-72 flex-shrink-0 cursor-pointer"
                >
                  {/* Real Image */}
                  <div className="h-40 overflow-hidden">
                    {p.images && p.images.length > 0 ? (
                      <img
                        src={p.images[0].url}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full bg-gray-300 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-2">
                      {p.type}
                    </span>

                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-gray-600 text-sm">{p.location}</p>
                    <p className="text-blue-600 font-bold mt-2">
                      ₹{p.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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