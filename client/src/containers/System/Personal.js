import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { path } from '../../utils/constant';
import { Information, ChangePassword, Like, Order } from './index';

const Personal = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const { currentData } = useSelector(state => state.user)
    // console.log(currentData.name)
    const pathurl = location.pathname
    const parts = pathurl.split('/')
    const last = parts[parts.length - 1];

    return (
        <div className='personal'>
            <div className='header-personal'>
                <p className='title center'>ACCOUNT</p>
                <span className='name_account center'>{currentData.name}</span>
            </div>
            <div className='menu-personal center'>
                <NavLink to={path.INFORMATION} className='content'>
                    <span>Information</span>
                </NavLink>
                <NavLink to={path.CHANGEPASSWORD} className='content'>
                    <span>Password</span>
                </NavLink>
                <NavLink to={path.ORDER} className='content'>
                    <span>Order</span>
                </NavLink>
                <NavLink to={path.LIKE} className='content'>
                    <span>Like</span>
                </NavLink>
            </div>
            <div className='main-personal'>
                {last === 'change_password' ? (
                    <ChangePassword />
                ) : last === 'like' ? (
                    <Like />
                ) : last === 'order' ? (
                    <Order />
                ) : (
                    <Information />
                )}
            </div>
        </div>
    )
}

export default Personal