import React from 'react'
import icons from '../../utils/icons'
import { NavLink } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import { path } from '../../utils/constant'

const { GoSearch, GiWolfHowl, MdOutlineShoppingCart } = icons

const Header = () => {
  return (
    <div className='header'>
      <div className='header-content'>
        <div className='logo-cate'>
          <NavLink to={'/'} className='logo text-2xl'>
            <GiWolfHowl /> <p className='text-logo'> FASHION</p>
          </NavLink>
          <div className='cate center'>
            TOPS
          </div>
        </div>
        <div className='search-cart-login text-xl'>
          <div className='search'>
            <span><GoSearch /></span>
          </div>
          <div className='cart'>
            <MdOutlineShoppingCart />
          </div>
          <div className='login'>
            <NavLink to={'/' + path.LOGIN}>LOGIN</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header