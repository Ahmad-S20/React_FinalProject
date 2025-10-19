import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LineAxis } from '@mui/icons-material';
import { Badge, Link } from '@mui/material';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import styles from "./Navbar.module.css"; // <-- import CSS module
import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useEffect } from 'react';
import AxiosUsersInstance from '../../API/AxiosUsersInstance';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import StorefrontIcon from '@mui/icons-material/Storefront';


export default function Navbar({isLoggedIn,setisLoggedIn}) {

  const {mode,toggleTheme} = useContext(ThemeContext);
  const { t} = useTranslation();
  const toggleLanguage = () => {
    i18next.changeLanguage(i18next.language === 'en' ? 'ar' : 'en');
    //window.document.dir = i18next.dir();
  }

  const [anchorEl, setAnchorEl] = useState(null);  // this for the dropdown menu
  

  useEffect(() =>{
    window.document.dir = i18next.dir();
  },[i18next.language])

  const fetchCartProducts = async () => {
     if(isLoggedIn)
     {
       const response = await AxiosUsersInstance.get('/carts');
      return response.data;
     }
     return null;
  }

  const fetchProfile = async () => {
    const response = await axios.get("https://kashop1.runasp.net/api/Users/profile",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }}
    );
    return response;
  }

  const {data:user} = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5
  })

  
  const {data} = useQuery({
     queryKey: ['cartProducts'],
     queryFn: fetchCartProducts,
    staleTime: 1000 * 60 * 5
  });
  //console.log(data);
  //console.log(data?.items.length);
  const [BadgeCount, setBadgeCount] = useState(0);
  const cartItemsCount = data?.items.length;
  const navigate = useNavigate();
  

  useEffect(() => {
    if(BadgeCount<cartItemsCount ||cartItemsCount==0 )
      setBadgeCount(cartItemsCount);
}, [cartItemsCount]);

  const clearBadge = ()=>{
    setBadgeCount(0);
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setisLoggedIn(false);
    navigate('/login');
  }

 return (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="sticky" top="0" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left Part: Logo and Store Name */}
        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'space-around',gap: 4 }}>
         <StorefrontIcon ></StorefrontIcon>
          <Typography variant="h6" component="div">
            <Link component={LinkRouter} to="/" color="inherit" underline="none">{t("mystore")}</Link>
          </Typography>
        </Box>
      
       <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',gap:2}}>
          <Link sx={{fontSize:'20px'}} component={LinkRouter} to="/" color="inherit" underline="none">{t("Home")}</Link>
          <Link sx={{fontSize:'20px'}} href="#Brands" color="inherit" underline="none">{t("Brands")}</Link>
          <Link sx={{fontSize:'20px'}} href="#categories" color="inherit" underline="none">{t("Categories")}</Link>
          <Link sx={{fontSize:'20px'}}  href="#Products" color="inherit" underline="none">{t("Products")}</Link>
          {isLoggedIn && (
            <Link onClick={clearBadge} component={LinkRouter} to="/cart" color="inherit" underline="none" sx={{fontSize:'20px',display:'inline-flex',alignItems:'center'}}>
              {BadgeCount ? ( <Badge badgeContent={BadgeCount} color="error" anchorOrigin={{vertical:'top',horizontal:'right'}} overlap="rectangular" sx={{'& .MuiBadge-badge':{transform:'translate(40%,-20%)',fontSize:'0.7rem'}}}>
                <Box component="span" sx={{mr:1.5}}>{t("Cart")}</Box>
              </Badge>):( <Box component="span" sx={{mr:1.5}}>{t("Cart")}</Box>)
              } 
            </Link>
          )}
        </Box>

        {/* Right Part: User-related links, Language Switcher, Dark Mode */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={toggleLanguage} sx={{ ml: 2 }}>
            {i18next.language === 'en' ? 'AR' : 'EN'}
          </Button>
          <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {isLoggedIn ? (
            <>
              {/* Dropdown Menu for User */}
              <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
                sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
              >
                <Typography variant="body2">{user?.data?.fullName}</Typography>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{ 'aria-labelledby': 'user-menu' }}
              >
                <MenuItem component={LinkRouter} to="/profile" onClick={() => setAnchorEl(null)}>
                  {t("Profile")}
                </MenuItem>
                <MenuItem onClick={handleLogout}>{t("Logout")}</MenuItem>
              </Menu>

            </>) : (
            <>
              <Link component={LinkRouter} to="/login" color="inherit" underline="none" sx={{ ml: 2 }}>
                {t("Login")}
              </Link>
              <Link component={LinkRouter} to="/register" color="inherit" underline="none" sx={{ ml: 2 }}>
                {t("Register")}
              </Link>
            </>
          )}

          
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
);

}
