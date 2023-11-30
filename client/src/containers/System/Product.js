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
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { currentData } = useSelector(state => state.user)
    const { functions } = useSelector(state => state.function)
    const permis = currentData.idPermission

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredProducts = [];
    // if (products && Array.isArray(products)) {
    //     filteredProducts = products.filter((item) =>
    //         item.name.includes(searchValue)
    //     );
    // }

    const handleCreateClick = () => {
        navigate(path.CREATE_PRODUCT);
    };

    useEffect(() => {
        let searchParamsObject = {}
        if (permis) searchParamsObject.permis = permis
        if (shouldRefetch) {
            dispatch(actions.getFunctions(searchParamsObject))
            setShouldRefetch(false)
        } else {
            dispatch(actions.getFunctions(searchParamsObject))
        }
    }, [dispatch, permis, shouldRefetch])

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
                        {/* {shouldReload && filteredProducts.length > 0 && mapRows(filteredProducts)}
                        {!shouldReload && products?.length > 0 && mapRows(products)} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product