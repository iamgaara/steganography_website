// src/components/navbar.js
import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Button sx={{ color: 'text.primary' }} component={Link} to="/">Home</Button>
          <Button sx={{ color: 'text.primary' }} component={Link} to="/encode">Encode</Button>
          <Button sx={{ color: 'text.primary' }} component={Link} to="/decode">Decode</Button>
          <Button sx={{ color: 'text.primary' }} component={Link} to="/contact">Contact Us</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
