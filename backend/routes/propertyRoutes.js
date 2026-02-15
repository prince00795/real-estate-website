const express = require("express");
const {
  createProperty,
  getProperties,
  getPropertyById,
} = require("../controllers/propertyController");

const router = express.Router();

router.post("/", createProperty);
router.get("/", getProperties);
router.get("/:id", getPropertyById);

module.exports = router;
