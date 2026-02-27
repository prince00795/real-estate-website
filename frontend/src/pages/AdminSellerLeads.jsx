import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AdminSellerLeads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/seller-leads",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLeads(res.data);
    };

    fetchLeads();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-6">Seller Leads</h2>

        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">City</th>
                <th className="p-3">Type</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.city}</td>
                  <td className="p-3">{lead.propertyType}</td>
                  <td className="p-3">{lead.purpose}</td>
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

export default AdminSellerLeads;