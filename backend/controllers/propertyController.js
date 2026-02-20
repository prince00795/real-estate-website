const Property = require("../models/Property");
const cloudinary = require("../config/cloudinary");


// GET ALL PROPERTIES
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PROPERTY
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE PROPERTY

const createProperty = async (req, res) => {
  try {
    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "real-estate-properties",
          }
        );

        imageUrls.push(result.secure_url);
      }
    }

    const property = await Property.create({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      type: req.body.type,
      description: req.body.description,
      images: imageUrls,
    });

    res.status(201).json(property);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// UPDATE PROPERTY
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.title = req.body.title || property.title;
    property.location = req.body.location || property.location;
    property.price = req.body.price || property.price;
    property.type = req.body.type || property.type;
    property.description = req.body.description || property.description;

    const updatedProperty = await property.save();

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROPERTY
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await property.deleteOne();

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
