import React from "react";
import Box from "@mui/material/Box";
import SideMenu from "./SideMenu";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box height={50} />
        <div style={{ padding: '23px' }} >
            <h1 style={{ color: '#24242b' }}>Enterprise Resource Planning</h1>
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Typography style={{ color: '#2a2c2e' }} paragraph>
                Enterprise resource planning (ERP) is a software system that helps
                you run your entire business, supporting automation and processes in
                finance, human resources, manufacturing, supply chain, services,
                procurement, and more.
              </Typography>
              
            </Box>
        </div>
        
      </Box>
    </>
  );
}
