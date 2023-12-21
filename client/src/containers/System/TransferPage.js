import icons from '../../utils/icons'
import * as actions from '../../store/actions'
import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useDispatch, useSelector } from 'react-redux'

const { TiDeleteOutline } = icons;
const styletd = 'text-center py-2 '

const TransferPage = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldReload, setShouldReload] = useState(false)
    const { currentData } = useSelector(state => state.user)
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { functions } = useSelector(state => state.function)
    const { transfers } = useSelector(state => state.transfer)
    const permis = currentData.idPermission

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredTransfers = [];
    if (transfers && Array.isArray(transfers)) {
        const searchRegex = new RegExp(searchValue, 'i');
        filteredTransfers = transfers.filter((item) =>
            searchRegex.test(item.name)
        );
    }

    const [payload, setPayload] = useState({
        id: '' || null, name: ''
    })
    const handleSubmitCreate = async () => {
        let finalPayload = payload;
        let invalids = validate(finalPayload);
        if (invalids === 0) {
            dispatch(actions.createTransfers(payload))
            setPayload({ id: '', name: '' })
            setShouldRefetch(true)
        }
    }
    const handleSubmitUpdate = async () => {
        dispatch(actions.updateTransfers(payload))
        setPayload({ id: '', name: '' })
        setShouldRefetch(true)
    }
    const validate = (payload) => {
        let invalids = 0;
        let fields = Object.entries(payload);

        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    msg: 'You must not leave this input blank!'
                }])
                invalids++;
                return;
            }
        })
        return invalids;
    }

    useEffect(() => {
        let searchParamsObject = {}
        if (permis) searchParamsObject.permis = permis
        if (shouldRefetch) {
            dispatch(actions.getPermissions())
            dispatch(actions.getTransfers())
            dispatch(actions.getFunctions(searchParamsObject))
            setShouldRefetch(false)
        } else {
            dispatch(actions.getPermissions())
            dispatch(actions.getTransfers())
            dispatch(actions.getFunctions(searchParamsObject))
        }
    }, [dispatch, permis, shouldRefetch])

    const renderTableRow = (item) => {
        const handleClickRow = () => {
            setPayload({ ...payload, id: item.id, name: item.name, idPermission: item.idPermission });
        };
        return (
            <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                <td className={styletd}>{item.id}</td>
                <td className={styletd}>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className='py-2'>{item.name}</td>
            </tr>
        );
    };

    return (
        <div className='transfer_page'>
            <div className='header-transfer_page end'>
                <input
                    className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
                    type="text"
                    placeholder='Search by name'
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
            {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
                <div className='form-transfer_page'>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'NAME'}
                        value={payload.name}
                        setValue={setPayload}
                        keyPayload={'name'}
                        type='text'
                    />
                    {payload.id ? (
                        <div className='update-transfer_page'>
                            <Button
                                fullWidth
                                text={'UPDATE'}
                                value={payload.id}
                                onClick={handleSubmitUpdate}
                            />
                            <span onClick={() => setPayload({ ...payload, id: '', url: '', name: '', idPermission: '' })}
                                className='icons-clear center'>
                                <TiDeleteOutline />
                            </span>
                        </div>
                    ) : (
                        <Button
                            class='col-span-2'
                            text={'CREATE'}
                            onClick={handleSubmitCreate}
                        />
                    )}
                </div>
            ))}
            <div className='list-transfer_page list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>NAME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shouldReload && filteredTransfers.length > 0 && filteredTransfers.map((item) => renderTableRow(item))}
                        {!shouldReload && Array.isArray(transfers) && transfers?.length > 0 && transfers.map((item) => renderTableRow(item))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TransferPage