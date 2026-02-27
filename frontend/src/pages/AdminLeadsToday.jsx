import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AdminLeadsToday = () => {
  const [todayLeads, setTodayLeads] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const buyers = await axios.get(
        "http://localhost:8000/api/leads",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sellers = await axios.get(
        "http://localhost:8000/api/seller-leads",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const today = new Date().toISOString().split("T")[0];

      const filtered = [...buyers.data, ...sellers.data].filter(
        (lead) =>
          new Date(lead.createdAt).toISOString().split("T")[0] === today
      );

      setTodayLeads(filtered);

    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-6">Today's Leads</h2>

        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">City</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {todayLeads.map((lead) => (
                <tr key={lead._id} className="border-b">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.city}</td>
                  <td className="p-3">
                    {new Date(lead.createdAt).toLocaleDateString()}
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

export default AdminLeadsToday;