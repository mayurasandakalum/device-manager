import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

import io from "socket.io-client";

import { BASE_API_URL } from "../constants/constants";
import LocationCard from "../components/locations/LocationCard";
import SearchBar from "../components/SearchBar";
import AddLocation from "../components/locations/AddLocation";
import { Toast } from "../utils/toast";
import { Link } from "react-router-dom";

const Locations = () => {
  const [locations, setLocations] = useState(null);
  const [updatedLocations, setUpdatedLocations] = useState();
  const [searchQuery, setsearchQuery] = useState();
  const [filteredLocations, setFilteredLocations] = useState(null);

  const handleDelete = (locationId) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location._id !== locationId)
    );
  };

  useEffect(() => {
    // const socket = io(BASE_API_URL, { transports: ["websocket"] });

    // socket.on("deviceUpdated", (change) => {
    //   if (change.status === "active") {
    //     Toast("active", `${change.serialNumber} device is now active.`);
    //   } else {
    //     Toast("inactive", `${change.serialNumber} device is no longer active.`);
    //   }

    //   setUpdatedLocations(change);
    // });

    axios
      .get(`${BASE_API_URL}/locations`)
      .then((res) => {
        console.log(res.data);
        setLocations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  // useEffect(() => {
  //   if (updatedLocations) {
  //     console.log("locations");
  //     setLocations((prevLocations) => {
  //       const updatedLocationIndex = prevLocations.findIndex(
  //         (location) => location._id === updatedLocations._id
  //       );

  //       if (updatedLocationIndex !== -1) {
  //         const updatedLocationsCopy = [...prevLocations];
  //         updatedLocationsCopy[updatedLocationIndex] = updatedLocations;
  //         return updatedLocationsCopy;
  //       }

  //       return prevLocations;
  //     });
  //   }
  // }, [updatedLocations]);

  useEffect(() => {
    if (locations) {
      const filtered = searchQuery
        ? locations.filter(
            (location) =>
              location.name.includes(searchQuery) ||
              location.address.includes(searchQuery) ||
              location.phone.includes(searchQuery)
          )
        : locations;
      setFilteredLocations(filtered);
    }
  }, [locations, searchQuery]);

  return (
    <div style={{ width: "100%" }}>
      <Grid container sx={{ px: "30px" }}>
        <Grid container item>
          <Grid
            container
            item
            sx={{ backgroundColor: "rgba(0, 178, 93, 0)", width: "100%" }}
          >
            <Grid container item sm={3}>
              <Grid container item>
                <Typography
                  sx={{
                    color: "#293241",
                    fontSize: {
                      sm: "35px",
                      xl: "40px",
                    },
                    fontWeight: "bold",
                  }}
                >
                  Location List
                </Typography>
              </Grid>
              <Grid container item>
                <Typography
                  sx={{
                    color: "#293241",
                    fontSize: { sm: "18px", xl: "20px" },
                  }}
                >
                  Manage all your Devices at one place
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={6}
              justifyContent="center"
              alignItems="center"
            >
              <SearchBar
                setSearchQuery={setsearchQuery}
                placeholder="Search Locations ( using Location Name, Address and Phone )"
              />
            </Grid>
            <Grid
              container
              item
              sm={3}
              justifyContent="end"
              alignItems="center"
              columnSpacing={2}
            >
              <Grid container item sm={6} justifyContent="end">
                <Link to={"/"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      height: {
                        sm: "40px",
                        xl: "50px",
                      },
                      textTransform: "none",
                      borderRadius: "30px",
                      borderWidth: "3px",
                      borderColor: "#293241",
                      fontWeight: "bold",
                      color: "#293241",
                      fontSize: {
                        sm: "16px",
                        xl: "20px",
                      },
                      "&:hover": {
                        borderWidth: "3px",
                        borderColor: "#293241",
                      },
                    }}
                  >
                    Devices
                  </Button>
                </Link>
              </Grid>
              <Grid container item sm={6}>
                <AddLocation
                  locations={locations}
                  setLocations={setLocations}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid
            container
            item
            columnSpacing={{ sm: 4, xl: 2 }}
            rowSpacing={3}
            sx={{ mt: "20px" }}
          >
            {filteredLocations &&
              filteredLocations.map((location) => (
                <LocationCard data={location} onDelete={handleDelete} />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Locations;
