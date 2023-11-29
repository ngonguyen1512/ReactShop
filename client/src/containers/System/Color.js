import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'

const { TiDeleteOutline } = icons;

const styletd = 'text-center px-4 py-2 '

const Color = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { states } = useSelector(state => state.state)
    const { currentData } = useSelector(state => state.user)
    const { functions } = useSelector(state => state.function)
    const { categories } = useSelector(state => state.category)
    const permis = currentData.idPermission

    const [payload, setPayload] = useState({
        id: '' || null, name: '', idState: ''
    });

    useEffect(() => {
        let searchParamsObject = {}
        if (permis) searchParamsObject.permis = permis
        dispatch(actions.getStates())
        dispatch(actions.getFunctions(searchParamsObject))
    }, [dispatch, permis])

    return (
        <div className='color'>
            <div className='header-color between'>
                <span></span>
                <input
                    className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
                    type="text"
                    placeholder='Search by name'
                    value={searchValue}
                // onChange={handleSearch}
                />
            </div>
            {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
                <div className='form-color'>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'NAME'}
                        value={payload.name}
                        setValue={setPayload}
                        keyPayload={'name'}
                        type='text'
                    />
                    <div>
                        <label className='text-xs mt-4'>STATE</label>
                        <select value={payload.idState}
                            onChange={(e) => setPayload({ ...payload, idState: e.target.value })}
                            className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
                            <option value="">Select STATE</option>
                            {states?.length > 0 && states.map(item => (item.id === 1 || item.id === 2) && (
                                <option value={item.id}>{item.id} - {item.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* <span className='hide'></span> */}
                    {/* {payload.id ? (
                        <div className='update-color'>
                            <Button
                                text={'UPDATE'}
                                value={payload.id}
                                onClick={handleSubmitUpdate}
                            />
                            <span onClick={() => setPayload({ ...payload, id: '', idCategory: '', name: '', idState: '' })}
                                className='icons-clear center'>
                                <TiDeleteOutline />
                            </span>
                        </div>
                    ) : ( */}
                    <Button
                        text={'CREATE'}
                    // onClick={handleSubmitCreate}
                    />
                    {/* )} */}
                </div>
            ))}
            <div className='list-color list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>STATE</th>
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

export default Color