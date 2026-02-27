import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

/* ✅ MOVE CARD OUTSIDE */
const Card = ({ title, count, color, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer p-6 rounded-xl shadow-md text-white transform hover:scale-105 transition ${color}`}
  >
    <h2 className="text-3xl font-bold">{count}</h2>
    <p className="mt-2 text-lg">{title}</p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [propertyCount, setPropertyCount] = useState(0);
  const [buyerCount, setBuyerCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

 useEffect(() => {
  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem("token");

      // Properties (public route)
      const properties = await axios.get(
        "http://localhost:8000/api/properties"
      );
      setPropertyCount(properties.data.total);

      // Buyer Leads (protected)
      const buyers = await axios.get(
        "http://localhost:8000/api/leads",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBuyerCount(buyers.data.length);

      // Seller Leads (protected + correct route)
      const sellers = await axios.get(
        "http://localhost:8000/api/seller-leads",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSellerCount(sellers.data.length);

      // Today's Leads
      const today = new Date().toISOString().split("T")[0];

      const todayLeads = [
        ...buyers.data,
        ...sellers.data,
      ].filter(
        (lead) =>
          new Date(lead.createdAt)
            .toISOString()
            .split("T")[0] === today
      );

      setTodayCount(todayLeads.length);

    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };

  fetchCounts();
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Total Properties"
            count={propertyCount}
            color="bg-blue-600"
            onClick={() => navigate("/admin/properties")}
          />

          <Card
            title="Buyer Leads"
            count={buyerCount}
            color="bg-green-600"
            onClick={() => navigate("/admin/buyer-leads")}
          />

          <Card
            title="Seller Leads"
            count={sellerCount}
            color="bg-purple-600"
            onClick={() => navigate("/admin/seller-leads")}
          />

          <Card
            title="Leads Today"
            count={todayCount}
            color="bg-orange-500"
            onClick={() => navigate("/admin/leads-today")}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;