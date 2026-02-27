const express = require("express");
const router = express.Router();
const { createLead, getLeads } = require("../controllers/leadController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", createLead);
router.get("/", protect, admin, getLeads);

module.exports = router;