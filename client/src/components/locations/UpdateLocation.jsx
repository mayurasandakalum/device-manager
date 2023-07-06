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

const UpdateLocation = ({ locationData, open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");

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
      _id: id,
      name: name,
      address: address,
      phone: phone,
    };

    axios
      .put(`${BASE_API_URL}/locations`, location)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);

      Swal.fire("Updated!", "Your location has been updated.", "success");
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    setId(locationData._id);
    setName(locationData.name);
    setAddress(locationData.address);
    setPhone(locationData.phone);
  }, []);

  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Grid container justifyContent="center" sx={{ mb: "15px" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Update location
          </Typography>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid container item rowSpacing={3}>
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

export default UpdateLocation;
