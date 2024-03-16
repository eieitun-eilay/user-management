import "./App.css";
import React, { useState } from "react";
import SideMenu from "./components/SideMenu";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import EmployeePage from "./components/EmployeePage";
import { ThemeProvider } from '@mui/material/styles'; 
import CustomTheme from './CustomTheme'; 

function App() {
  return (
    <>
      <ThemeProvider theme={CustomTheme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route
              path="/employeepage"
              exact
              element={<EmployeePage />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
