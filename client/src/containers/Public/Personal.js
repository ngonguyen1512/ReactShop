import React from 'react'
import { useSelector } from 'react-redux'
import { path } from '../../utils/constant'
import { NavLink, useLocation } from 'react-router-dom'
import { Information, ChangePassword, Like, Order, UpdateAccount } from './index'

const Personal = () => {
    const location = useLocation()
    const pathurl = location.pathname
    const parts = pathurl.split('/')
    const last = parts[parts.length - 1]
    const { currentData } = useSelector(state => state.user)

    return (
        <div className='personal'>
            <div className='header-personal'>
                <p className='title center'>ACCOUNT</p>
                <span className='name_account center'>{currentData.name}</span>
            </div>
            <div className='main-personal'>
                <div className='menu-personal'>
                    <NavLink to={path.INFORMATION} className='content'>Information</NavLink>
                    <NavLink to={path.CHANGEPASSWORD} className='content'>Password</NavLink>
                    <NavLink to={path.ORDER} className='content'>Order</NavLink>
                    <NavLink to={path.LIKE} className='content'>Like</NavLink>
                </div>
                <div className='page-personal'>
                    {last === 'change_password' ? (
                        <ChangePassword />
                    ) : last === 'like' ? (
                        <Like />
                    ) : last === 'order' ? (
                        <Order />
                    ) : last === 'update_account' ? (
                        <UpdateAccount />
                    ) : (
                        <Information />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Personal