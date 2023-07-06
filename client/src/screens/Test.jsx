import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(imageName, serialNumber, type, status) {
  return { imageName, serialNumber, type, status };
}

const rows = [
  createData("file-1688675972922-236354847.png", "6.0", "24", "4.0"),
];

const DeviceTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <img
                  src={`http://localhost:8082/devices/image/${row.imageName}`}
                  alt={row.imageName}
                  style={{ height: "50px" }}
                />
              </TableCell>
              <TableCell>{row.serialNumber}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeviceTable;
