// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Grid } from '@mui/material';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import EncodeImage from './components/EncodeImage';
import DecodeImage from './components/DecodeImage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1c1c1e', // Dark background
      paper: '#2c2c2e',   // Slightly lighter dark background for elements
    },
    primary: {
      main: '#3a3a3c',     // Dark color for navbar and footer
    },
    secondary: {
      main: '#ffffff',     // White text color
    },
    text: {
      primary: '#e5e5e7',  // Light gray text color for readability
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <Navbar />
          <Grid container justifyContent="center" sx={{ flex: 1, p: 2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/encode" element={<EncodeImage />} />
              <Route path="/decode" element={<DecodeImage />} />
            </Routes>
          </Grid>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
