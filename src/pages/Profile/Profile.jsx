import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, Outlet } from 'react-router-dom';
import AxiosUsersInstance from '../../API/AxiosUsersInstance';
import axios from 'axios';

export default function Profile() {
  
  const getData = async () => {
    const response = await axios("https://kashop1.runasp.net/api/Users/profile",
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
  console.log(response.data);
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" >
      <List>     
          <ListItem >
            <ListItemButton component={Link} to="/profile/info">
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={"Info"} />
            </ListItemButton>
          </ListItem>

           <ListItem >
            <ListItemButton component={Link} to="/profile/orders">
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </ListItem>

           <ListItem >
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
     <Box sx={{display: 'flex'}}>
       <Drawer variant='permanent' anchor='left'
      sx={{
       
        flexShrink: 0,
        '& .MuiDrawer-paper' :
        {
           width: 250,
           boxSizing: 'border-box',
           backgroundColor: '#f5f5f5',
           top:"63px",
           position: 'sticky',
           height:' cal(100vh - 63px)',
        }
      }}
      >
        {DrawerList}
      </Drawer>
      <Box sx={{flexGrow: 1,alignItems: 'center',justifyContent: 'center',padding: 3,backgroundColor: '#f5f5f5'}}>
        <Outlet/>
      </Box>
     </Box>
  );
}
