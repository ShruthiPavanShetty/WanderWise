import React from 'react'
import { Outlet } from 'react-router'

const ViewTripLayout = () => {
  return (
    <div className='pt-6 lg:pt-18'><Outlet/></div>
  )
}

export default ViewTripLayout;