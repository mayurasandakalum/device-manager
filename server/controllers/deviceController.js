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
      console.log(location);

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

  try {
    const result = await Device.findOneAndUpdate(
      { _id: _id },
      {
        serialNumber,
        type,
        status,
        locationName,
      }
    );
    res.status(200).json({ msg: "Device updated", Device: result });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findOneAndDelete({
      _id: req.params.id,
    });
    if (device) {
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(404).json({ msg: "Device not found!" });
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
