const { Location } = require("../models/locationModel");

const getAllLocations = async (req, res) => {
  const locations = await Location.find();
  res.status(200).json(locations);
};

const getLocationById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  try {
    const location = await Location.findById(id);
    if (location) {
      res.status(200).json(location);
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

const createLocation = async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    const location = await Location.create({
      name,
      address,
      phone,
    });
    res.status(200).json({ msg: "Successfully created", location: location });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateLocation = async (req, res) => {
  const { _id, name, address, phone } = req.body;

  try {
    const result = await Location.findOneAndUpdate(
      { _id: _id },
      {
        name,
        address,
        phone,
      }
    );
    res.status(200).json({ msg: "Location updated", Location: result });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOneAndDelete({
      _id: req.params.id,
    });
    if (location) {
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(404).json({ msg: "Location not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getAllLocations,
  createLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
};
