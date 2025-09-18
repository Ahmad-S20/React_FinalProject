import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LineAxis } from '@mui/icons-material';
import { Link } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
export default function Navbar() {
  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{gap:3}}>

          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button> */}
          
          {/* <Link color='inherit' >Home</Link>
          <Link color='inherit' >Cart</Link>
          <Link color='inherit' >Login</Link>
          <Link color='inherit' >Register</Link> */}

          <Link component={LinkRouter} to={'/'} color='inherit' underline='none'>Home</Link>
          <Link component={LinkRouter} to={'/cart'} color='inherit' underline='none'>Cart</Link>
          <Link component={LinkRouter} to={'/login'} color='inherit' underline='none'>Login</Link>
          <Link component={LinkRouter} to={'/register'} color='inherit' underline='none'>Register</Link>

        </Toolbar>
      </AppBar>
    </Box>
  )
}
