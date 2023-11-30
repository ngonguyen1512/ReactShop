import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'
import Swal from 'sweetalert2';

const { TiDeleteOutline, BiDetail } = icons;
const styletd = 'text-center py-2 '

const Permission = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { states } = useSelector(state => state.state)
    const { currentData } = useSelector(state => state.user)
    const { functions } = useSelector(state => state.function)
    const { permissions, msg } = useSelector(state => state.permission)
    const permis = currentData.idPermission

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredPermissions = [];
    if (permissions && Array.isArray(permissions)) {
        filteredPermissions = permissions.filter((item) =>
            item.name.includes(searchValue)
        );
    }

    const [payload, setPayload] = useState({
        id: '' || null, name: '', idState: ''
    })
    const handleSubmitCreate = async () => {
        let finalPayload = payload;
        let invalids = validate(finalPayload);
        if (invalids === 0) {
            dispatch(actions.createPermissions(payload))
            setPayload({ id: '', name: '', idState: '' })
            setShouldRefetch(true)
        }
    }
    const handleSubmitUpdate = async () => {
        dispatch(actions.updatePermissions(payload))
        setPayload({ id: '', name: '', idState: '' })
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
        msg && Swal.fire('Oops !', msg, 'error');
    }, [msg]);

    useEffect(() => {
        let searchParamsObject = {}
        if (permis) searchParamsObject.permis = permis
        if (shouldRefetch) {
            dispatch(actions.getStates())
            dispatch(actions.getPermissions())
            dispatch(actions.getFunctions(searchParamsObject))
            setShouldRefetch(false)
        } else {
            dispatch(actions.getStates())
            dispatch(actions.getPermissions())
            dispatch(actions.getFunctions(searchParamsObject))
        }
    }, [dispatch, permis, shouldRefetch])

    const renderTableRow = (item) => {
        const handleClickRow = () => {
            setPayload({ ...payload, id: item.id, name: item.name, idState: item.idState });
        };
        return (
            <>
                <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                    <td className={`w-[4%] ${styletd}`}>{item.id}</td>
                    <td className={styletd}>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className='py-2'>{item.name}</td>
                    <td className={styletd}>{item.idState}</td>
                </tr>
            </>
        );
    };

    return (
        <div className='permission'>
            <div className='header-permission between'>
                <span></span>
                <input
                    className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
                    type="text"
                    placeholder='Search by name'
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
            {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
                <div className='form-permission'>
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
                            className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 rounded-md w-full cursor-pointer'>
                            <option value="">Select STATE</option>
                            {states?.length > 0 && states.map(item => (item.id === 1 || item.id === 2) && (
                                <option value={item.id}>{item.id} - {item.name}</option>
                            ))}
                        </select>
                    </div>
                    <span className='hide'></span>
                    {payload.id ? (
                        <div className='update-category'>
                            <Button
                                text={'UPDATE'}
                                value={payload.id}
                                onClick={handleSubmitUpdate}
                            />
                            <span onClick={() => setPayload({ ...payload, id: '', name: '', idState: '' })}
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
            <div className='list-permission list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='w-[4%]'>ID</th>
                            <th>DATE</th>
                            <th>NAME</th>
                            <th>STATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shouldReload && filteredPermissions.length > 0 && filteredPermissions.map((item) => renderTableRow(item))}
                        {!shouldReload && Array.isArray(permissions) && permissions?.length > 0 && permissions.map((item) => renderTableRow(item))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Permission