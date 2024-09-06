import React from 'react'
import Header from './_components/header'

import ImageHome from './_components/imageHome'
import SpecialProduct from './_components/specialProduct'
import About from './_components/about'
import NewLetter from './_components/newletter'
import Footer from './_components/footer'

import ProductList from './_components/product'


const HomePage = () => {
  return (
    <div>
      <Header/>
      <ImageHome/>
      <SpecialProduct/>
      <About/>
     <ProductList/>
      <NewLetter/>
      <Footer/>
    </div>
  )
}

export default HomePage
