import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'

const { TiDeleteOutline, BiDetail, CiEdit } = icons;

const styletd = 'text-center px-4 py-2 '

const Product = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { currentData } = useSelector(state => state.user)
    // const { functions } = useSelector(state => state.function)
    // const { categories } = useSelector(state => state.category)
    const permis = currentData.idPermission

    return (
        <div className='product'>
            <div className='header-product between'>
                <span></span>
                <input
                    className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
                    type="text"
                    placeholder='Search by name'
                    value={searchValue}
                // onChange={handleSearch}
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
                        </tr>
                    </thead>
                    <tbody>
                        {/* {shouldReload && filteredCategories.length > 0 && mapRows(filteredCategories)}
            {!shouldReload && categories?.length > 0 && mapRows(categories)} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product