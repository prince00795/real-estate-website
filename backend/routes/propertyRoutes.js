const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const { protect, admin } = require("../middleware/authMiddleware");

// ================= PUBLIC ROUTES =================
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// ================= ADMIN ROUTES =================

// CREATE PROPERTY (with multiple images)
router.post(
  "/",
  protect,
  admin,
  upload.array("images", 10), // max 10 images
  createProperty
);

// UPDATE PROPERTY (with images support)
router.put(
  "/:id",
  protect,
  admin,
  upload.array("images", 10),
  updateProperty
);

// DELETE PROPERTY
router.delete("/:id", protect, admin, deleteProperty);

module.exports = router;
