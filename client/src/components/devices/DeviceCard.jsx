import React from "react";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreHorizRounded";

import PosImage from "../../assets/pos-image.png";
import MoreButton from "./MoreButton";

const borderRadius = "5px";
const textColor = "black";

const DataRow = ({ title, data }) => {
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
      <Grid container item sm={6}>
        <Typography sx={{ color: textColor }}>{title}</Typography>
      </Grid>
      <Grid container item sm={6}>
        <Typography
          sx={{ width: "100%", color: textColor, textAlign: "right" }}
        >
          {data}
        </Typography>
      </Grid>
    </Grid>
  );
};

const DeviceCard = ({ data, onDelete }) => {
  let machineType;

  if (data.type === "pos") {
    machineType = "Pos";
  } else if (data.type === "kisok") {
    machineType = "Kiosk";
  } else {
    machineType = "Signage";
  }

  return (
    <Grid container item sx={{ width: "300px" }}>
      <Grid
        container
        item
        sx={{
          // backgroundImage: "linear-gradient( #00d2ff 0%, #3a47d5 100%)",
          bgcolor: "white",
          borderRadius: `${borderRadius}`,
          boxShadow: "1px 5px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Grid container item sm={4}>
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
            {machineType}
          </Typography>
        </Grid>
        <Grid container item sm={8} justifyContent="end">
          <MoreButton deviceID={data._id} onDelete={onDelete} />
        </Grid>
        <Grid
          container
          item
          sm={12}
          alignItems="center"
          justifyContent="center"
        >
          <img
            src={PosImage}
            alt="pos image"
            style={{ maxWidth: "75%", maxHeight: "75%", objectFit: "fill" }}
          />
        </Grid>
        <Grid
          container
          item
          sm={12}
          alignItems="center"
          justifyContent="center"
        >
          <Chip
            label={data.status === "active" ? "Active" : "Inactive"}
            avatar={
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    data.status === "active"
                      ? "rgba(0, 178, 93, 1)"
                      : "rgba(244, 67, 54, 1)",
                }}
              ></div>
            }
            sx={{
              px: "5px",
              fontWeight: "bold",
              bgcolor:
                data.status === "active"
                  ? "rgba(0, 178, 93, 0.3)"
                  : "rgba(244, 67, 54, 0.3)",
              color:
                data.status === "active"
                  ? "rgba(0, 178, 93, 1)"
                  : "rgba(244, 67, 54, 1)",
            }}
          />
        </Grid>
        <Grid container item sm={12}>
          <DataRow title="Serial Number" data={data.serialNumber} />
          <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.05)", width: "100%" }} />
          <DataRow title="Location" data={data.locationName} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DeviceCard;
