import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button } from '../../components'
import icons from '../../utils/icons'
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';

const { TiDeleteOutline, BiDetail, CiEdit } = icons;

const styletd = 'text-center px-4 py-2 '

const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { products } = useSelector(state => state.product)
    const { currentData } = useSelector(state => state.user)
    const { functions } = useSelector(state => state.function)
    const permis = currentData.idPermission

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredProducts = [];
    if (products && Array.isArray(products)) {
        const searchRegex = new RegExp(searchValue, 'i');
        filteredProducts = products.filter((item) =>
            searchRegex.test(item.name)
        );
    }

    const handleCreateClick = () => {
        navigate(path.CREATE_PRODUCT);
    };

    useEffect(() => {
        let searchParamsObject = {}
        if (permis) searchParamsObject.permis = permis
        if (shouldRefetch) {
            dispatch(actions.getProducts())
            dispatch(actions.getFunctions(searchParamsObject))
            setShouldRefetch(false)
        } else {
            dispatch(actions.getProducts())
            dispatch(actions.getFunctions(searchParamsObject))
        }
    }, [dispatch, permis, shouldRefetch])

    const [payload, setPayload] = useState({ id: '' || null })
    const renderTableRow = (item) => {
        const handleClickRow = () => { setPayload({ ...payload, id: item.id }) };
        const handleDetail = () => {
            if (payload.id === item.id) {
                setPayload({ id: null });
                setIsShowDetail(false);
            } else {
                setPayload({ ...payload, id: item.id });
                setIsShowDetail(true);
            }
        };
        return (
            <>
                <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                    <td className={styletd}>{item.id}</td>
                    <td className={styletd}>{item.idSample}</td>
                    <td className='py-2'>{item.name}</td>
                    <td className={styletd}>{item.discount}</td>
                    <td className={styletd}>{(item.price).toLocaleString()} đ</td>
                    <td className={styletd}>{item.idState}</td>
                    <td className={`w-[4%] ${styletd}`}>
                        <Button fullWidth
                            IcAfter={BiDetail}
                            value={payload.id}
                            setValue={setPayload}
                            onClick={() => handleDetail()}
                        />
                    </td>
                    <td className={`w-[4%] ${styletd}`}>
                        <Link to={path.UPDATE_PRODUCT + `/${item.id}`}>
                            <Button fullWidth IcAfter={CiEdit} textColor='text-secondary'
                            // onClick={handleUpdate(item.id)}
                            />
                        </Link>
                    </td>
                </tr>
                {isShowDetail && payload.id === item.id && (
                    <tr className='bg-[#ddd]'>
                        <td colSpan={2} className={styletd}>{item.idCategory} - {item?.product_category.name}</td>
                        <td colSpan={6} className={styletd}>{item.information}</td>
                    </tr>
                )}
            </>
        );
    };


    return (
        <div className='product'>
            <div className='header-product between'>
                {functions?.length > 0 && functions.map(item => item.name === 'Create' && (
                    <button onClick={handleCreateClick}
                        className={`py-1 px-2 border border-[#000] hover:bg-[#000] hover:text-[#fff] font-semibold flex items-center justify-center`}>
                        CREATE
                    </button>
                ))}
                <input
                    className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
                    type="text"
                    placeholder='Search by name'
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
            <div className='list-product list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>SAMPLE</th>
                            <th>NAME</th>
                            <th>DISCOUNT</th>
                            <th>PRICE</th>
                            <th>STATE</th>
                            <th className='w-[8%]'>DETAIL</th>
                            <th className='w-[4%]'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {shouldReload && filteredProducts.length > 0 && filteredProducts.map((item) => renderTableRow(item))}
                        {!shouldReload && Array.isArray(products) && products?.length > 0 && products.map((item) => renderTableRow(item))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product