const Lead = require("../models/Lead");

const createLead = async (req, res) => {
  try {
    const { name, phone, city } = req.body;

    const lead = await Lead.create({
      name,
      phone,
      city,
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
};