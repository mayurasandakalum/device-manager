const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

module.exports = (io) => {
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

  return router;
};
