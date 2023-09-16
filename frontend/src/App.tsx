import * as React from "react";
import LogIn from "./components/LogIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import MainDashboard from "./components/MainDashboard";
import Conversions from "./components/Conversions";
import { Typography } from "@mui/material";
import LogOut from "./components/LogOut";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route index element={<MainDashboard />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/conversions" element={<Conversions />} />
        <Route path="*" element={<Typography variant='h1' textAlign="center" >{'Page not Found'}</Typography>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
