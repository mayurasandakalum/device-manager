import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Modal } from "antd";
import DragAndDrop from "../components/DragAndDrop";

const App = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");

  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSerialNumber = (e) => {
    console.log(e.target.value);
    setSerialNumber(e.target.value);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpenModal}
        disableElevation
        sx={{
          height: "50px",
          textTransform: "none",
          borderRadius: "30px",
          borderWidth: "3px",
          borderColor: "#293241",
          fontWeight: "bold",
          color: "#293241",
          fontSize: "20px",
          "&:hover": {
            borderWidth: "3px",
            borderColor: "#293241",
          },
        }}
      >
        + Add a Device
      </Button>
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

export default App;
