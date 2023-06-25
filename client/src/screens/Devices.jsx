import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

import io from "socket.io-client";

import { BASE_API_URL } from "../constants/constants";
import DeviceCard from "../components/devices/DeviceCard";
import SearchBar from "../components/SearchBar";
import AddDevice from "../components/devices/AddDevice";
import { Toast } from "../utils/toast";

const Devices = () => {
  const [devices, setDevices] = useState(null);
  const [updatedDevices, setUpdatedDevices] = useState();
  const [searchQuery, setsearchQuery] = useState();
  const [filteredDevices, setFilteredDevices] = useState(null);

  const handleDelete = (deviceId) => {
    setDevices((prevDevices) =>
      prevDevices.filter((device) => device._id !== deviceId)
    );
  };

  useEffect(() => {
    const socket = io(BASE_API_URL, { transports: ["websocket"] });

    socket.on("deviceUpdated", (change) => {
      if (change.status === "active") {
        Toast("active", `${change.serialNumber} device is now active.`);
      } else {
        Toast("inactive", `${change.serialNumber} device is no longer active.`);
      }

      setUpdatedDevices(change);
    });

    axios
      .get(`${BASE_API_URL}/devices`)
      .then((res) => {
        setDevices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (updatedDevices) {
      setDevices((prevDevices) => {
        const updatedDeviceIndex = prevDevices.findIndex(
          (device) => device._id === updatedDevices._id
        );

        if (updatedDeviceIndex !== -1) {
          const updatedDevicesCopy = [...prevDevices];
          updatedDevicesCopy[updatedDeviceIndex] = updatedDevices;
          return updatedDevicesCopy;
        }

        return prevDevices;
      });
    }
  }, [updatedDevices]);

  useEffect(() => {
    if (devices) {
      const filtered = searchQuery
        ? devices.filter(
            (device) =>
              device.serialNumber.includes(searchQuery) ||
              device.type.includes(searchQuery)
          )
        : devices;
      setFilteredDevices(filtered);
    }
  }, [devices, searchQuery]);

  return (
    <div style={{ width: "100%" }}>
      <Grid container sx={{ px: "30px" }}>
        <Grid container item>
          <Grid
            container
            item
            sx={{ backgroundColor: "rgba(0, 178, 93, 0)", width: "100%" }}
          >
            <Grid container item sm={3}>
              <Grid container item>
                <Typography
                  sx={{
                    color: "#293241",
                    fontSize: {
                      sm: "35px",
                      xl: "40px",
                    },
                    fontWeight: "bold",
                  }}
                >
                  Device List
                </Typography>
              </Grid>
              <Grid container item>
                <Typography
                  sx={{
                    color: "#293241",
                    fontSize: { sm: "18px", xl: "20px" },
                  }}
                >
                  Manage all your Devices at one place
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={6}
              justifyContent="center"
              alignItems="center"
            >
              <SearchBar
                setSearchQuery={setsearchQuery}
                placeholder="Search Devices ( using Serial Number, Type )"
              />
            </Grid>
            <Grid
              container
              item
              sm={3}
              justifyContent="end"
              alignItems="center"
              columnSpacing={2}
            >
              <Grid container item sm={6} justifyContent="end">
                <Button
                  variant="outlined"
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
                  Locations
                </Button>
              </Grid>
              <Grid container item sm={6}>
                <AddDevice devices={devices} setDevices={setDevices} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid
            container
            item
            columnSpacing={{ sm: 4, xl: 2 }}
            rowSpacing={3}
            sx={{ mt: "20px" }}
          >
            {filteredDevices &&
              filteredDevices.map((device) => (
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
