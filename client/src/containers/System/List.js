import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom';
import * as actions from '../../store/actions'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import { Product, Dimension, Color, Image, Quantity, CreateProduct, UpdateProduct, CreateInfo } from './index';

const List = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const pathurl = location.pathname
    const parts = pathurl.split('/')
    const idTransfer = 4
    const last = parts[parts.length - 1];
    const { allocations } = useSelector(state => state.allocation)

    useEffect(() => {
        let searchParamsObject = {}
        if (idTransfer) searchParamsObject.idTransfer = idTransfer
        dispatch(actions.getAllocations(searchParamsObject))
    }, [dispatch]);

    return (
        <div className='list'>
            <div className='header-list'>
                {allocations?.length > 0 && allocations.map(item => (
                    <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className='content'>
                        <span>{item.name}</span>
                    </NavLink>
                )
                )}
            </div>
            <div className='main-list'>
                {last === 'dimension' ? (
                    <Dimension />
                ) : last === 'color' ? (
                    <Color />
                ) : last === 'image' ? (
                    <Image />
                ) : last === 'quantity' ? (
                    <Quantity />
                ) : last === 'create_info' ? (
                    <CreateInfo />
                ) : last === 'create_product' ? (
                    <CreateProduct />
                ) : last === 'update_product' ? (
                    <UpdateProduct />
                ) : (
                    <Product />
                )}
            </div>
        </div>
    )
}

export default List