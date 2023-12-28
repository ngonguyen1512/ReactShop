import React, { useEffect } from 'react'
import { Sample, Category } from './index'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'

const Type = () => {
    const idTransfer = 3
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
        <div className='type'>
            <div className='header-type'>
                {allocations?.length > 0 && allocations.map(item => (
                    <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className='content'>
                        {item.name}
                    </NavLink>
                )
                )}
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