import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom';
import * as actions from '../../store/actions'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import { Product, Dimension, Color, Image, Quantity, CreateProduct, UpdateProduct, CreateDetail, CreateImage } from './index';

const List = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const pathurl = location.pathname
    const parts = pathurl.split('/')
    const idTransfer = 4
    const last = parts[parts.length - 1];
    const index = parts.indexOf("1");
    const { products } = useSelector(state => state.product)

    // Lấy phần từ ngay trước phần tử "/1"
    const updateProduct = parts[index - 1];
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