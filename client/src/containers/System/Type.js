import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import { Sample, Category } from './index';

const Type = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pathurl = location.pathname
    const parts = pathurl.split('/')
    const last = parts[parts.length - 1];
    const { transfers } = useSelector(state => state.transfer)

    useEffect(() => {
        dispatch(actions.getTransfers())
    }, [dispatch]);

    return (
        <div className='type'>
            <div className='header-type'>
                {transfers?.length > 0 && transfers.map(item => {
                    if (item.relation === 2)
                        return (
                            <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className='content'>
                                <span>{item.name}</span>
                            </NavLink>
                        )
                    return null
                })}
            </div>
            <div className='main-type'>
                {last === 'sample' ? (
                    <Sample />
                ) : (
                    <Category />
                )}
            </div>
        </div>
    )
}

export default Type