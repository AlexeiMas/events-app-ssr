import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const BackdropLoader = () => {
  return (
    <Box display={"grid"} position={"fixed"} bgcolor={"black"} style={{placeItems: "center", inset: 0}}>
      <CircularProgress color="success"/>
    </Box>
  );
};

export default BackdropLoader;