const SellerLead = require("../models/SellerLead");
const nodemailer = require("nodemailer");

const createSellerLead = async (req, res) => {
  try {
    const seller = await SellerLead.create(req.body);

    // 🔥 Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔥 Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // send to admin email
      subject: "New Property Seller Lead 🚀",
      html: `
        <h3>New Seller Lead</h3>
        <p><strong>Name:</strong> ${seller.name}</p>
        <p><strong>Phone:</strong> ${seller.phone}</p>
        <p><strong>City:</strong> ${seller.city}</p>
        <p><strong>Property Type:</strong> ${seller.propertyType}</p>
        <p><strong>Purpose:</strong> ${seller.purpose}</p>
      `,
    });

    res.status(201).json(seller);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerLeads = async (req, res) => {
  try {
    const leads = await SellerLead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSellerLead,
  getSellerLeads,
};