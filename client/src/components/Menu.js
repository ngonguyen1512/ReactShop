import { NavLink } from 'react-router-dom'
import * as actions from '../store/actions'
import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Menu = ({ permis }) => {
    const dispatch = useDispatch()
    const { menus } = useSelector(state => state.menu)
    useEffect(() => {
        dispatch(actions.getMenus())
    }, [dispatch])

    return (
        <>
            {menus?.length > 0 && menus.map(item => (
                item.idPermission === permis &&
                <NavLink to={'/' + item.url}>
                    <div className='cursor-pointer'>{item.name}</div>
                </NavLink>
            ))}
        </>
    )
}

export default memo(Menu)