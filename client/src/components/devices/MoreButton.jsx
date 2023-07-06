import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/EditRounded";
import Divider from "@mui/material/Divider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import { IconButton } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

import UpdateDevice from "./UpdateDevice";

import { BASE_API_URL } from "../../constants/constants";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const MoreButton = ({ locations, deviceData, deviceID, onDelete }) => {
  const [openModel, setOpenModel] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenModal = () => {
    setOpenModel(true);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = async () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios
            .delete(`${BASE_API_URL}/devices/${deviceID}`)
            .catch((error) => {
              Swal.fire("Error!", "Somthing went wrong", "error");
            });

          onDelete(deviceID);
          Swal.fire("Deleted!", "Your device has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting resource:", error);
          throw error;
        }
      }
    });
  };

  return (
    <div>
      <UpdateDevice
        locations={locations}
        deviceData={deviceData}
        open={openModel}
        setOpen={setOpenModel}
      />
      <IconButton
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        sx={{ mr: "10px" }}
      >
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenModal} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDeleteClick} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default MoreButton;
