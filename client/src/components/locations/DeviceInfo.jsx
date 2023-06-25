import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Modal } from "antd";
import DragAndDrop from "../DragAndDrop";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

const DeviceInfo = ({ devices, open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);

    setOpen(false);
    setConfirmLoading(false);
    // setTimeout(() => {
    // }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   console.log(devices);
  // }, [devices]);

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
            Associated Devices
          </Typography>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid container item rowSpacing={1}>
            <Grid
              container
              item
              rowSpacing={1}
              sm={6}
              sx={{ fontWeight: "bold" }}
            >
              Device Serial Number
            </Grid>
            <Grid
              container
              item
              rowSpacing={1}
              sm={6}
              sx={{ fontWeight: "bold" }}
            >
              Status
            </Grid>
          </Grid>
          {devices &&
            devices.devices.map((device) => (
              <Grid container item rowSpacing={1}>
                <Grid container item rowSpacing={1} sm={6}>
                  {device.serialNumber}
                </Grid>
                <Grid container item rowSpacing={1} sm={6}>
                  {device.status}
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Modal>
    </>
  );
};

export default DeviceInfo;
