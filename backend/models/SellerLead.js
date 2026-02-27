const mongoose = require("mongoose");

const sellerLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SellerLead", sellerLeadSchema);