import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Modal } from "antd";
import DragAndDrop from "../DragAndDrop";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { BASE_API_URL } from "../../constants/constants";

const UpdateDevice = ({ locations, deviceData, open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [location, setLocation] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    const device = {
      _id: id,
      serialNumber: serialNumber,
      type: type,
      status: status,
      imageName: deviceData.imageName,
      locationName: location,
    };

    axios
      .put(`${BASE_API_URL}/devices`, device)
      .then((response) => {
        console.log(response);
        Swal.fire("Updated!", "Your device has been updated.", "success");
      })
      .catch((error) => {
        if (error.response.data.error.includes("E11000")) {
          Swal.fire("Error!", "This serial number already exists", "error");
        } else {
          Swal.fire("Error!", "Somthing went wrong", "error");
        }
      });

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    setId(deviceData._id);
    setSerialNumber(deviceData.serialNumber);
    setStatus(deviceData.status);
    setType(deviceData.type);
    setLocation(deviceData.locationName);
  }, []);

  return (
    <>
      <Modal
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Grid container justifyContent="center" sx={{ mb: "15px" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Update device
          </Typography>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid container item rowSpacing={1}>
            <Grid container item sx={{ width: "100%" }}>
              <Typography>Device information</Typography>
            </Grid>
            <Grid container item sx={{ width: "100%" }}>
              <TextField
                label="Serial Number"
                variant="outlined"
                value={serialNumber}
                onChange={handleSerialNumber}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Grid container item columnSpacing={2}>
            <Grid container item sm={4}>
              <FormControl fullWidth>
                <InputLabel>Device Type</InputLabel>
                <Select
                  value={type}
                  label="Device Type"
                  onChange={handleTypeChange}
                >
                  <MenuItem value={"pos"}>Pos</MenuItem>
                  <MenuItem value={"kiosk"}>Kiosk</MenuItem>
                  <MenuItem value={"signage"}>Signage</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid container item sm={4}>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  value={location}
                  label="Location"
                  onChange={handleLocationChange}
                >
                  {locations.map((location) => (
                    <MenuItem key={location._id} value={location.name}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid container item sm={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={handleSatusChange}
                >
                  <MenuItem value={"active"}>Active</MenuItem>
                  <MenuItem value={"inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item rowSpacing={1}>
            <Grid container item sx={{ width: "100%" }}>
              <Typography>Uploaded image</Typography>
            </Grid>
            <Grid
              container
              item
              sx={{ width: "100%" }}
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={`http://localhost:8082/devices/image/${deviceData.imageName}`}
                alt="pos image"
                style={{
                  height: "100%",
                  maxWidth: "50%",
                  maxHeight: "100%",
                  objectFit: "fill",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default UpdateDevice;
