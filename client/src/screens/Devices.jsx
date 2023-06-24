import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import axios from "axios";

import { BASE_API_URL } from "../constants/constants";
import DeviceCard from "../components/devices/DeviceCard";

const Devices = () => {
  const [devices, setDevices] = useState(null);

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
      <Grid container>
        <Grid container item>
          <div style={{ backgroundColor: "red", width: "100%" }}>asd</div>
        </Grid>
        <Grid container item>
          <Grid
            container
            item
            columnSpacing={2}
            rowSpacing={3}
            sx={{ mt: "20px" }}
          >
            {devices && devices.map((device) => <DeviceCard data={device} />)}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Devices;
