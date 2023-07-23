import * as React from "react";
import LogIn from "./components/LogIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import MainDashboard from "./components/MainDashboard";
import { Typography } from "@mui/material";
import LogOut from "./components/LogOut";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route index element={<MainDashboard />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/Logout" element={<LogOut />} />
        <Route path="*" element={<Typography variant='h1' textAlign="center" >{'Page not Found'}</Typography>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
