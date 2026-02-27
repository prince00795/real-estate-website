const express = require("express");
const router = express.Router();
const {
  createSellerLead,
  getSellerLeads,
} = require("../controllers/sellerLeadController");

const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", createSellerLead);
router.get("/", protect, admin, getSellerLeads);

module.exports = router;