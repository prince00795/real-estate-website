const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
         validator: function (v) {
        return /^[0-9]{10}$/.test(v);
        },
            message: "Phone number must be exactly 10 digits",
  },
},
    city: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);