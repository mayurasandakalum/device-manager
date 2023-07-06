import { InboxOutlined } from "@ant-design/icons";
import { Button, Typography } from "@mui/material";
import { message, Upload } from "antd";
import axios from "axios";

const DragAndDrop = ({ afterFileName, setAfterFileName }) => {
  const handleOnChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      // message.success(`${info.file.name} file uploaded successfully.`);
      setAfterFileName(info.file.response.filename);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleOnDrop = (event) => {
    console.log("Dropped files", event.dataTransfer.files);
  };

  const handleOnRemove = async (file) => {
    try {
      await axios.delete(
        `http://localhost:8082/devices/image/${afterFileName}`
      );
      setAfterFileName(null);
      message.success(`${file.name} file removed successfully.`);
    } catch (error) {
      console.error(error);
      message.error(`${file.name} file removal failed.`);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Upload.Dragger
        name="file"
        action="http://localhost:8082/devices/image"
        style={{ width: "100%" }}
        onChange={handleOnChange}
        onDrop={handleOnDrop}
        onRemove={handleOnRemove}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <Typography>Drag and Drop to Upload</Typography>
        <Typography>or</Typography>
        <Button sx={{ textTransform: "none", fontSize: "15px", mt: "5px" }}>
          Browse Files
        </Button>
      </Upload.Dragger>
    </div>
  );
};
export default DragAndDrop;
