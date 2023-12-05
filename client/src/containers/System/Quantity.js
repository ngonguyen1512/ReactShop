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
    const { states } = useSelector(state => state.state)
    const { currentData } = useSelector(state => state.user)
    const { functions } = useSelector(state => state.function)
    const { quantities } = useSelector(state => state.quantity)
    const permis = currentData.idPermission

    const [payload, setPayload] = useState({
        id: '' || null, idState: '', quantity: ''
    })
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredQuantity = [];
    const searchValueAsNumber = parseInt(searchValue, 10);

    if (!isNaN(searchValueAsNumber) && quantities && Array.isArray(quantities)) {
        filteredQuantity = quantities.filter((item) =>
            Number.isInteger(item.idProduct) && item.idProduct === searchValueAsNumber
        );
    }
    const handleSubmitUpdate = async () => {
        dispatch(actions.updateQuantities(payload))
        setPayload({ id: '', idState: '', quantity: '' })
        setShouldRefetch(true)
    }

    useEffect(() => {
        let searchParamsObject = {}
        if (permis) searchParamsObject.permis = permis
        if (shouldRefetch) {
            dispatch(actions.getStates())
            dispatch(actions.getQuantities())
            dispatch(actions.getFunctions(searchParamsObject))
            setShouldRefetch(false)
        } else {
            dispatch(actions.getStates())
            dispatch(actions.getQuantities())
            dispatch(actions.getFunctions(searchParamsObject))
        }
    }, [dispatch, shouldRefetch, permis])

    const renderTableRow = (item) => {
        const handleClickRow = () => { setPayload({ ...payload, id: item.id, quantity: item.quantity, idState: item.idState }) }
        return (
            <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                <td className={styletd}>{item.id}</td>
                <td className={styletd}>{item.idProduct} - {item?.quantity_product.name}</td>
                <td className={styletd}>{item.idColor} - {item?.quantity_color.name}</td>
                <td className={styletd}>{item.idSize} - {item?.quantity_size.name}</td>
                <td className={styletd}>{(item.quantity)}</td>
                <td className={styletd}>{item.idState}</td>
            </tr>
        );
    };


    return (
        <div className='quantity'>
            <div className='header-quantity between'>
                <span></span>
                <input
                    className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
                    type="text"
                    placeholder='Search by id product'
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
            {functions?.length > 0 && functions.map(item => item.name === 'Update' && (
                <div className='form-quantity'>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'QUANTITY'}
                        value={payload.quantity}
                        setValue={setPayload}
                        keyPayload={'quantity'}
                        type='number'
                    />
                    <div>
                        <label className='text-xs mt-4'>STATE</label>
                        <select
                            value={payload.idState}
                            onChange={(e) => setPayload({ ...payload, idState: e.target.value })}
                            className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'
                        >
                            <option value="">Select STATE</option>
                            {states?.length > 0 &&
                                states.map((item) => (item.id === 1 || item.id === 2) && (
                                    <option key={item.id} value={item.id}>
                                        {item.id} - {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <span className='hide'></span>
                    <div className='update-quantity'>
                        <Button
                            fullWidth
                            text={'UPDATE'}
                            value={payload.id}
                            setValue={setPayload}
                            onClick={handleSubmitUpdate}
                        />
                        <span onClick={() => setPayload({ ...payload, id: '', idState: '', quantity: '' })}
                            className='icons-clear center'>
                            <TiDeleteOutline />
                        </span>
                    </div>
                </div>
            ))}
            <div className='list-quantity list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PRODUCT</th>
                            <th>COLOR</th>
                            <th>SIZE</th>
                            <th>QUANTITY</th>
                            <th>STATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shouldReload && filteredQuantity.length > 0 && filteredQuantity.map((item) => renderTableRow(item))}
                        {!shouldReload && Array.isArray(quantities) && quantities?.length > 0 && quantities.map((item) => renderTableRow(item))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Quantity