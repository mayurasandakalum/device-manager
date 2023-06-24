import * as React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ setSearchQuery, placeholder }) {
  return (
    <Box component="form" noValidate autoComplete="off" sx={{ width: "80%" }}>
      <FormControl sx={{ width: "100%", height: "100%" }}>
        <OutlinedInput
          placeholder={placeholder}
          endAdornment={
            <InputAdornment position="end">
              <IconButton sx={{ color: "white" }}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          sx={{
            color: "#293241",
            fontSize: "20px",
            fontWeight: "bold",
            height: "50px",
            borderWidth: "3px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#293241",
              borderRadius: "30px",
              borderWidth: "3px",
            },
          }}
          // onChange={(event) => {
          //   setSearchQuery(event.target.value);
          // }}
        />
      </FormControl>
    </Box>
  );
}
