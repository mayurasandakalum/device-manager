import { InboxOutlined } from "@ant-design/icons";
import { Button, Typography } from "@mui/material";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const DragAndDrop = () => (
  <div style={{ width: "100%" }}>
    <Dragger {...props} style={{ width: "100%" }}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <Typography>Drag and Drop to Upload</Typography>
      <Typography>or</Typography>
      <Button sx={{ textTransform: "none", fontSize: "15px", mt: "5px" }}>
        Browse Files
      </Button>
    </Dragger>
  </div>
);
export default DragAndDrop;
