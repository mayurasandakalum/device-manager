import React from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Locations from "./screens/Locations";
import Devices from "./screens/Devices";
import Test from "./screens/Test";

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
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" exact element={<Devices />} />
          <Route path="/locations" exact element={<Locations />} />
          {/* <Test /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
