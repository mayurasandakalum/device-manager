const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");
const locationController = require("../controllers/locationController");

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
