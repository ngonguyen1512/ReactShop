import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'

const { TiDeleteOutline } = icons;

const styletd = 'text-center px-4 py-2 '

const Quantity = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { currentData } = useSelector(state => state.user)
    const { functions } = useSelector(state => state.function)
    const { categories } = useSelector(state => state.category)
    const permis = currentData.idPermission

    return (
        <div className='quantity'>
            <div className='header-quantity between'>
                <span></span>
                <input
                    className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
                    type="text"
                    placeholder='Search by name'
                    value={searchValue}
                // onChange={handleSearch}
                />
            </div>
            <div className='list-quantity list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='w-[5%]'>ID</th>
                            <th className='w-[10%]'>PRODUCT</th>
                            <th>IMAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {shouldReload && filteredAccounts.length > 0 && filteredAccounts.map((item) => renderTableRow(item))}
            {!shouldReload && Array.isArray(accounts) && accounts?.length > 0 && accounts.map((item) => renderTableRow(item))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Quantity