import { Typography } from '@mui/material'
import React from 'react'
import Brands from '../../components/Brands/Brands'
import Categories from '../../components/Categories/Categories'
import Products from '../../components/Products/Products'
import MainSection from '../../components/MainSection/MainSection'
import {Container} from '@mui/material'

export default function Home() {
  return (
    <>
    {/* first section here */}
    <MainSection/>
    <Container>
       <Brands/>
      <Categories/>
      <Products/>
    </Container>
    </>
  )
}
