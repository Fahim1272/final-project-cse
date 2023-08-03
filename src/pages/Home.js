import React from 'react'
import Navbar from '../features/navbar/Navbar'
import { ProductList } from '../features/product-list/components/ProductList'
import Slider from '../features/slider/Slider'

export default function Home() {
  return (
    <div className='bg-white'>
        <Navbar>
          
            <Slider></Slider>
            <ProductList></ProductList>
        </Navbar>
    </div>
  )
}
