const { Device } = require("../models/deviceModel");
const { Location } = require("../models/locationModel");

const getAllDevices = async (req, res) => {
  const devices = await Device.find();
  res.status(200).json(devices);
};

const getDeviceById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  try {
    const device = await Device.findById(id);
    if (device) {
      res.status(200).json(device);
    } else {
      res.status(404).json({ error: "Device not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

const createDevice = async (req, res) => {
  try {
    const { serialNumber, type, status, locationName } = req.body;

    // validate the device type and status
    if (
      !["pos", "kiosk", "signage"].includes(type) ||
      !["active", "inactive"].includes(status)
    ) {
      return res.status(400).json({ error: "Invalid device type or status" });
    } else {
      // Find the location by name
      const location = await Location.findOne({ name: locationName });

      if (location) {
        const device = await Device.create({
          serialNumber,
          type,
          status,
          locationName,
        });

        location.devices.push(device._id);
        await location.save();

        res
          .status(200)
          .json({ message: "Successfully created!", device: device });
      } else {
        res.status(404).json({ error: "Location not found" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDevice = async (req, res) => {
  const { _id, serialNumber, type, status, locationName } = req.body;

  console.log({ _id, serialNumber, type, status, locationName });

  try {
    // Validate the device type and status
    if (
      !["pos", "kiosk", "signage"].includes(type) ||
      !["active", "inactive"].includes(status)
    ) {
      return res.status(400).json({ error: "Invalid device type or status" });
    }

    const device = await Device.findById(_id);
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    const previousLocationName = device.locationName;

    // Find the new location by name
    const newLocation = await Location.findOne({ name: locationName });
    if (!newLocation) {
      return res.status(404).json({ error: "Location not found" });
    }

    // Remove the device ID from the previous location's devices array
    if (previousLocationName) {
      const previousLocation = await Location.findOne({
        name: previousLocationName,
      });
      if (previousLocation) {
        previousLocation.devices.pull(device._id);
        await previousLocation.save();
      }
    }

    // Update the device with the new information
    device.serialNumber = serialNumber;
    device.type = type;
    device.status = status;
    device.locationName = locationName;
    await device.save();

    // Add the device ID to the new location's devices array
    newLocation.devices.push(device._id);
    await newLocation.save();

    res.status(200).json({ message: "Device updated", device: device });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findOneAndDelete({
      _id: req.params.id,
    });

    if (device) {
      const locationName = device.locationName;

      // Find the location by name
      const location = await Location.findOne({ name: locationName });
      if (location) {
        // Remove the device ID from the location's devices array
        location.devices.pull(device._id);
        await location.save();
      }

      res.status(200).json({ message: "Successfully deleted!" });
    } else {
      res.status(404).json({ message: "Device not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getAllDevices,
  createDevice,
  getDeviceById,
  updateDevice,
  deleteDevice,
};
