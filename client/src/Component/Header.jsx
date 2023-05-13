import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        /*color={theme.palette.secondary[100]}*/
        fontWeight="bold"
        sx={{ mb: "5px" ,color:'#202005'}}
      >
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary[30]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;