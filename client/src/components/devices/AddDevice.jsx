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

const AddDevice = ({ locations, devices, setDevices }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [serialNumber, setSerialNumber] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  const [afterFileName, setAfterFileName] = useState(null);

  const handleOpenModal = () => {
    setOpen(true);
  };

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
      serialNumber: serialNumber,
      type: type,
      status: status,
      imageName: afterFileName,
      locationName: location,
    };

    axios
      .post("http://localhost:8082/devices", device)
      .then((response) => {
        setDevices([...devices, response.data.device]);
        setIsSuccess(true);
        Swal.fire("Added!", "Your device has been added.", "success");
      })
      .catch((error) => {
        console.log(error);
        setIsSuccess(false);
        if (error.response.data.error.includes("E11000")) {
          Swal.fire("Error!", "This serial number already exists", "error");
        } else {
          Swal.fire("Error!", "Somthing went wrong", "error");
        }
      });

    setTimeout(() => {
      handleCancel();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);

    setSerialNumber("");
    setStatus("");
    setType("");
    setLocation("");
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpenModal}
        disableElevation
        sx={{
          height: {
            sm: "40px",
            xl: "50px",
          },
          textTransform: "none",
          borderRadius: "30px",
          borderWidth: "3px",
          borderColor: "#293241",
          fontWeight: "bold",
          color: "#293241",
          fontSize: {
            sm: "16px",
            xl: "20px",
          },
          "&:hover": {
            borderWidth: "3px",
            borderColor: "#293241",
          },
        }}
      >
        + Add Device
      </Button>
      <Modal
        open={open}
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
              <Typography>Upload a image</Typography>
            </Grid>
            <Grid container item sx={{ width: "100%" }}></Grid>
          </Grid>
        </Grid>
        <DragAndDrop
          afterFileName={afterFileName}
          setAfterFileName={setAfterFileName}
        />
      </Modal>
    </>
  );
};

export default AddDevice;
