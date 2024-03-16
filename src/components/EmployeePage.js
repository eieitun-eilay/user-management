import React from "react";
import Box from "@mui/material/Box";
import SideMenu from "./SideMenu";
import EmployeeListPage from "./EmployeeListPage";
import Navbar from "./Navbar";

export default function EmployeePage() {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <div className="bgcolor">
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <SideMenu />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <EmployeeListPage />
          </Box>
        </Box>
      </div>
    </>
  );
}
