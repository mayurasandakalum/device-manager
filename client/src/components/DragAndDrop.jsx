import { InboxOutlined } from "@ant-design/icons";
import { Button, Typography } from "@mui/material";
import { message, Upload } from "antd";
// const { Dragger } = Upload;
// const props = {
//   name: "file",
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
// };
const DragAndDrop = () => {
  const handleOnChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleOnDrop = (event) => {
    console.log("Dropped files", event.dataTransfer.files);
  };

  const handleOnRemove = (event) => {
    console.log(event);
  };

  return (
    <div style={{ width: "100%" }}>
      <Upload.Dragger
        name="file"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
