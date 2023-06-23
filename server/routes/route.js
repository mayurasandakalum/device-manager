const express = require("express");
const router = express.Router();

const deviceController = require("../controllers/deviceController");
const locationController = require("../controllers/locationController");

router.get("/devices", deviceController.getAllDevices);
router.get("/devices/:id", deviceController.getDeviceById);
router.post("/devices", deviceController.createDevice);
router.put("/devices", deviceController.updateDevice);
router.delete("/devices/:id", deviceController.deleteDevice);

router.get("/locations", locationController.getAllLocations);
router.get("/locations/:id", locationController.getLocationById);
router.post("/locations", locationController.createLocation);
router.put("/locations", locationController.updateLocation);
router.delete("/locations/:id", locationController.deleteLocation);

module.exports = router;
