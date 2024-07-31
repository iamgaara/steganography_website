// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body2">
        © 2024 Image Steganography. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
