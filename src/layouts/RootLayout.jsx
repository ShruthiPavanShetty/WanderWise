import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const RootLayout = () => {
  return (
    <div className='font-sans'>
      <div className='relative'>
      <Header/>
      </div>
      <div className='pt-20 pb-5 relative bg-[#16404D]'><Outlet/></div>
      <div className='relative'><Footer/></div>
    </div>
  )
}

export default RootLayout