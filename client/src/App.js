import React from "react";
import Devices from "./screens/Devices";
import Test from "./screens/Test";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1500,
      xl: 1800,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Toaster />
        <Devices />
        {/* <Test /> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
