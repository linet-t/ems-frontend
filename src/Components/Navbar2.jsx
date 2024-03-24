import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from 'react-router-dom'; 
import LogoImage from '../images/logo2.png';

const CustomNavbar = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const NavLink = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1rem',
  padding: theme.spacing(1),
  textDecoration: 'none',
  border: '1px solid transparent', // Add a small border
  transition: 'border-color 0.3s ease-in-out', // Add transition for smooth hover effect

  '&:hover': {
    borderColor: 'white', // Change border color on hover
  },
}));

const Navbar2 = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <CustomNavbar>
            <Typography variant="h6" component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <img src={LogoImage} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%' }} />
            </Typography>
            <NavLink component={RouterLink} to="/">Home</NavLink>
            <NavLink component={RouterLink} to="/leaveemployee">Leave</NavLink>
            <NavLink component={RouterLink} to="/taskemployee">Task</NavLink>
            <NavLink component={RouterLink} to="/eventemployee">Events</NavLink>
            <NavLink component={RouterLink} to="/feedbackemployee">Feedback</NavLink>

          </CustomNavbar>
          <Menu
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorEl={null}
            open={false}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar2;
