import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import {Container} from '@mui/material'
import MainSection from '../components/MainSection/MainSection'
import { AuthContext } from '../Context/AuthContext'

export default function MainLayout() {

  const [isLoggedIn,setisLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <AuthContext.Provider  value={{ isLoggedIn, setisLoggedIn }}>
    <Navbar isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>
    {/* <Container> */}
      <Outlet context={{setisLoggedIn}}/>
    {/* </Container> */}
    <Footer/> 
    </AuthContext.Provider>
  )
}
