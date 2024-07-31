// src/components/Home.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ color: 'text.primary' }}>
        Welcome to Image Steganography
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', mt: 2 }}>
        This is a website where you can encode and decode hidden messages in images.
      </Typography>
    </Box>
  );
};

export default Home;
