import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom'; 
import LogoImage from '../images/logo2.png';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation links

const CustomNavbar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1, // To occupy the remaining space
  justifyContent: 'space-between', // To push logout link to the right
});

const Navbar2 = () => {
  const handleLogout = () => {
    // Clear session
    sessionStorage.clear();
    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <CustomNavbar>
            <Typography variant="h6" component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <img src={LogoImage} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%' }} />
            </Typography>
          </CustomNavbar>
          {/* Logout link */}
          <span className="nav-link" onClick={handleLogout}>Logout</span>


        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar2;
