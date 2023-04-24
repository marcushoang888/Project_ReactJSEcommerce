import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Navbar from "../components/Navbar";
import Sidebar, { DrawerHeader } from "../components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";


export default function RootLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar onDrawerOpen={handleDrawerOpen} open={open} />

      <Sidebar theme={theme} onDrawerClose={handleDrawerClose} open={open} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet/>
      </Box>
    </Box>
  );
}