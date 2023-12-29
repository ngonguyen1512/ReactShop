import React, { useEffect } from 'react'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { Permission, Menu, State, Function } from './index'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'

const Role = () => {
    const idTransfer = 7
    const location = useLocation()
    const dispatch = useDispatch()
    const pathurl = location.pathname
    const parts = pathurl.split('/')
    const last = parts[parts.length - 1]
    const { allocations } = useSelector(state => state.allocation)

    useEffect(() => {
        let searchParamsObject = {}
        if (idTransfer) searchParamsObject.idTransfer = idTransfer
        dispatch(actions.getAllocations(searchParamsObject))
    }, [dispatch]);

    return (
        <div className='role'>
            <div className='header-role'>
                {allocations?.length > 0 && allocations.map(item => (
                    <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className='content'>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>
            <div className='main-role'>
                {last === 'menu' ? (
                    <Menu />
                ) : last === 'state' ? (
                    <State />
                ) : last === 'function' ? (
                    <Function />
                ) : (
                    <Permission />
                )}
            </div>
        </div>
    )
}

export default Role