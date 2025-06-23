import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 3,
        mt: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" color="text.secondary" align="center">
          {"© "} {new Date().getFullYear()} Copyright by Mariana ❤️.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
