import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Modal } from "antd";

import DeviceTable from "./DeviceTable";

const DeviceInfo = ({ devices, open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);

    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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

        <DeviceTable devices={devices} />
      </Modal>
    </>
  );
};

export default DeviceInfo;
