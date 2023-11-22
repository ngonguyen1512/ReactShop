import React from 'react'
import { Header } from './index'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <div className='main center'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home