import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Modal } from "antd";
import DragAndDrop from "../DragAndDrop";
import axios from "axios";
import Swal from "sweetalert2";

const AddLocation = ({ locations, setLocations }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    const location = {
      name: name,
      address: address,
      phone: phone,
    };

    axios
      .post("http://localhost:8082/locations", location)
      .then((response) => {
        console.log(response.data.device);
        setLocations([...locations, response.data.location]);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error!", "Somthing went wrong", "error");
      });

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);

      Swal.fire("Added!", "Location has been added.", "success");
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);

    setName("");
    setPhone("");
    setAddress("");
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
        + Add Location
      </Button>
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Grid container justifyContent="center" sx={{ mb: "15px" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Add a Location
          </Typography>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid container item rowSpacing={2}>
            <Grid container item sx={{ width: "100%" }}>
              <Typography>Location information</Typography>
            </Grid>
            <Grid container item sx={{ width: "100%" }}>
              <TextField
                label="Location Name"
                variant="outlined"
                value={name}
                onChange={handleName}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid container item sx={{ width: "100%" }}>
              <TextField
                label="Address"
                variant="outlined"
                value={address}
                onChange={handleAddress}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid container item sx={{ width: "100%" }}>
              <TextField
                label="Phone Number"
                variant="outlined"
                value={phone}
                onChange={handlePhone}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default AddLocation;
