import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import axios from "axios";

import { BASE_API_URL } from "../constants/constants";
import DeviceCard from "../components/devices/DeviceCard";
import { Button, Typography } from "@mui/material";

const Devices = () => {
  const [devices, setDevices] = useState(null);

  const handleDelete = (deviceId) => {
    setDevices((prevDevices) =>
      prevDevices.filter((device) => device._id !== deviceId)
    );
  };

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/devices`)
      .then((res) => {
        setDevices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Grid container sx={{ px: "30px" }}>
        <Grid container item>
          <Grid
            container
            item
            sx={{ backgroundColor: "rgba(0, 178, 93, 0)", width: "100%" }}
          >
            <Grid container item sm={6}>
              <Grid container item>
                <Typography
                  sx={{
                    color: "#293241",
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  Device List
                </Typography>
              </Grid>
              <Grid container item>
                <Typography sx={{ color: "#293241", fontSize: "20px" }}>
                  Manage all your Devices at one place
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={6}
              justifyContent="end"
              alignItems="center"
              sx={{ pr: "100px" }}
            >
              <Button
                variant="outlined"
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
                + Add Device
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid
            container
            item
            columnSpacing={2}
            rowSpacing={3}
            sx={{ mt: "20px" }}
          >
            {devices &&
              devices.map((device) => (
                <DeviceCard
                  key={device._id}
                  data={device}
                  onDelete={handleDelete}
                />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Devices;
