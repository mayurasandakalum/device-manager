import React, { useState } from "react";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import RightArrow from "@mui/icons-material/ArrowForwardIosRounded";

import LocationImage from "../../assets/location-pin.png";
import MoreButton from "./MoreButton";
import { useEffect } from "react";
import DeviceInfo from "./DeviceInfo";
import axios from "axios";
import { BASE_API_URL } from "../../constants/constants";

const borderRadius = "5px";
const textColor = "black";

const DataRow = ({ title, data, handleOpen }) => {
  return (
    <Grid
      container
      item
      sm={12}
      sx={{
        px: "20px",
        py: "12px",
        "&:hover": {
          backdropFilter: "blur(4px)",
          bgcolor: "rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <Grid container item sm={6} alignItems="center">
        <Typography sx={{ color: textColor }}>{title}</Typography>
      </Grid>
      <Grid container item sm={6} justifyContent="end" alignItems="center">
        {data !== "open" ? (
          <Typography
            sx={{ width: "100%", color: textColor, textAlign: "right" }}
          >
            {data}
          </Typography>
        ) : (
          <IconButton aria-label="delete" onClick={handleOpen}>
            <RightArrow />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

const LocationCard = ({ data, onDelete }) => {
  const [locationDevices, setLocationDevices] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/locations/devices/${data._id}`)
      .then((res) => {
        setLocationDevices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [openModel, setOpenModel] = useState(false);

  const handleOpenModal = () => {
    setOpenModel(true);
  };

  return (
    <Grid container item sm={3} xl={2}>
      <DeviceInfo
        devices={locationDevices}
        open={openModel}
        setOpen={setOpenModel}
      />
      <Grid
        container
        item
        sx={{
          bgcolor: "white",
          borderRadius: `${borderRadius}`,
          boxShadow: "1px 5px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Grid container item sm={5}>
          <Typography
            sx={{
              bgcolor: "#293241",
              borderRadius: `${borderRadius} 0 ${borderRadius} 0`,
              color: "white",
              px: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data.name}
          </Typography>
        </Grid>
        <Grid container item sm={7} justifyContent="end">
          <MoreButton
            locationData={data}
            locationID={data._id}
            onDelete={onDelete}
          />
        </Grid>
        <Grid
          container
          item
          sm={12}
          alignItems="center"
          justifyContent="center"
        >
          <img
            src={LocationImage}
            alt="pos image"
            style={{ maxWidth: "75%", maxHeight: "75%", objectFit: "fill" }}
          />
        </Grid>

        <Grid container item sm={12}>
          <DataRow title="Address" data={data.address} />
          <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.05)", width: "100%" }} />
          <DataRow title="Phone Number" data={data.phone} />
          <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.05)", width: "100%" }} />
          <DataRow
            title="Device List"
            data={"open"}
            handleOpen={handleOpenModal}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LocationCard;
