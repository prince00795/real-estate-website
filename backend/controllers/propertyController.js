const Property = require("../models/Property");
const cloudinary = require("../config/cloudinary");

// ================= GET ALL PROPERTIES (With Pagination) =================

const getProperties = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const total = await Property.countDocuments();

    const properties = await Property.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      total,
      properties,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET SINGLE PROPERTY =================
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


// ================= CREATE PROPERTY (With Images) =================
const createProperty = async (req, res) => {
  try {
    let images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "real-estate-properties" }
        );

        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const property = await Property.create({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      type: req.body.type,
      description: req.body.description,
      images,
    });

    res.status(201).json(property);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE PROPERTY (Replace Images) =================
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Update text fields
    property.title = req.body.title || property.title;
    property.location = req.body.location || property.location;
    property.price = req.body.price || property.price;
    property.type = req.body.type || property.type;
    property.description = req.body.description || property.description;

    // If new images uploaded
    if (req.files && req.files.length > 0) {

      // Delete old images from Cloudinary
      for (const image of property.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      let newImages = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "real-estate-properties" }
        );

        newImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

      property.images = newImages;
    }

    const updatedProperty = await property.save();

    res.json(updatedProperty);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= DELETE PROPERTY (Delete Cloudinary Images) =================
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Delete images from Cloudinary
    for (const image of property.images) {
      await cloudinary.uploader.destroy(image.public_id);
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