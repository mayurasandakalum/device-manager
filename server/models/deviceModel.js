const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ["pos", "kiosk", "signage"], required: true },
  status: { type: String, enum: ["active", "inactive"], required: true },
  locationName: { type: String, required: true },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = { Device };
