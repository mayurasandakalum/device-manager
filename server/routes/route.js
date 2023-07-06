const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const deviceController = require("../controllers/deviceController");
const locationController = require("../controllers/locationController");

module.exports = (io) => {
  //! Devices
  // Get all devices
  router.get("/devices", deviceController.getAllDevices);

  // Get a device by ID
  router.get("/devices/:id", deviceController.getDeviceById);

  // Create a new device
  router.post("/devices", (req, res) => {
    deviceController.createDevice(req, res, io);
  });

  // Update a device
  router.put("/devices", (req, res) => {
    deviceController.updateDevice(req, res, io);
  });

  // Delete a device
  router.delete("/devices/:id", (req, res) => {
    deviceController.deleteDevice(req, res, io);
  });

  // File upload route
  const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const originalExtension = path.extname(file.originalname);
      const filename = file.fieldname + "-" + uniqueSuffix + originalExtension;
      cb(null, filename);
    },
  });

  const upload = multer({ storage });

  router.post("/devices/image", upload.single("file"), (req, res) => {
    try {
      // Access the uploaded file using req.file
      if (!req.file) {
        throw new Error("No file received");
      }

      // Send a response
      res.status(200).json({
        message: "File uploaded successfully.",
        filename: req.file.filename,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "File upload failed." });
    }
  });

  // File deletion route
  router.delete("/devices/image/:filename", (req, res) => {
    try {
      const filename = req.params.filename;

      // Remove the file from the uploads directory
      fs.unlink(`uploads/${filename}`, (error) => {
        if (error) {
          throw error;
        }

        console.log("File deleted:", filename);
        res.status(200).json({ message: "File deleted successfully." });
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "File deletion failed." });
    }
  });

  //! Locations
  router.get("/locations", locationController.getAllLocations);
  router.get("/locations/:id", locationController.getLocationById);
  router.post("/locations", locationController.createLocation);
  router.put("/locations", locationController.updateLocation);
  router.delete("/locations/:id", locationController.deleteLocation);
  router.get(
    "/locations/devices/:id",
    locationController.getDevicesByLocationId
  );

  return router;
};
