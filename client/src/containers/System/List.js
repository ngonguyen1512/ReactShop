import React, { useEffect } from 'react'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import { Product, Dimension, Color, Image, Quantity, CreateProduct, UpdateProduct, CreateDetail, CreateImage, CreateDetail2 } from './index';

const List = () => {
    const idTransfer = 4
    const location = useLocation()
    const dispatch = useDispatch()
    const pathurl = location.pathname
    const parts = pathurl.split('/')
    const last = parts[parts.length - 1]
    const updateProduct = parts[parts.length - 2]
    const { products } = useSelector(state => state.product)
    const { allocations } = useSelector(state => state.allocation)

    useEffect(() => {
        let searchParamsObject = {}
        if (idTransfer) searchParamsObject.idTransfer = idTransfer
        dispatch(actions.getProducts())
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
                ) : last === 'create_image' ? (
                    <CreateImage />
                ) : last === 'create_detail' ? (
                    <CreateDetail />
                ) : last === 'create_detail2' ? (
                    <CreateDetail2 />
                ) : last === 'create_product' ? (
                    <CreateProduct />
                ) : updateProduct === 'update_product' ? (
                    <>
                        {products?.length > 0 && products.map(item => {
                            if (item.id === parseInt(last))
                                return (
                                    <UpdateProduct
                                        id={parseInt(last)}
                                        name={item.name}
                                        idCategory={item.idCategory}
                                        idSample={item.idSample}
                                        price={item.price}
                                        discount={item.discount}
                                        information={item.information}
                                        idState={item.idState}
                                    />
                                )
                            return null
                        })}
                    </>
                ) : (
                    <Product />
                )}
            </div>
        </div>
    )
}

export default List