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

const UpdateDevice = ({ deviceData, open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSatusChange = (e) => {
    setStatus(e.target.value);
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
      locationName: "Location A",
    };

    axios
      .put(`${BASE_API_URL}/devices`, device)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);

      Swal.fire("Updated!", "Your device has been updated.", "success");
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    console.log(deviceData);

    setSerialNumber("");
    setStatus("");
    setType("");
  };

  useEffect(() => {
    setId(deviceData._id);
    setSerialNumber(deviceData.serialNumber);
    setStatus(deviceData.status);
    setType(deviceData.type);
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
            Add a device
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
            <Grid container item sm={6}>
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

            <Grid container item sm={6}>
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
              <Typography>Upload a image</Typography>
            </Grid>
            <Grid container item sx={{ width: "100%" }}>
              <DragAndDrop />
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default UpdateDevice;
