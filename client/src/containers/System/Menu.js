import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'
import Swal from 'sweetalert2';

const { TiDeleteOutline, MdOutlineDeleteSweep } = icons;
const styletd = 'text-center py-2 '

const Menu = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { menus, msg } = useSelector(state => state.menu)
    const { currentData } = useSelector(state => state.user)
    const { functions } = useSelector(state => state.function)
    const { permissions } = useSelector(state => state.permission)
    const permis = currentData.idPermission

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredMenus = [];
    if (menus && Array.isArray(menus)) {
        const searchRegex = new RegExp(searchValue, 'i');
        filteredMenus = menus.filter((item) =>
            searchRegex.test(item.name)
        );
    }

    const [payload, setPayload] = useState({
        id: '' || null, url: '', name: '', idPermission: ''
    })
    const handleSubmitCreate = async () => {
        let finalPayload = payload;
        let invalids = validate(finalPayload);
        if (invalids === 0) {
            dispatch(actions.createMenus(payload))
            setPayload({ id: '', url: '', name: '', idPermission: '' })
            setShouldRefetch(true)
        }
    }
    const handleSubmitUpdate = async () => {
        dispatch(actions.updateMenus(payload))
        setPayload({ id: '', url: '', name: '', idPermission: '' })
        setShouldRefetch(true)
    }
    const handleSubmitDelete = async () => {
        dispatch(actions.deleteMenus(payload))
        setShouldRefetch(true);
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
            dispatch(actions.getMenus())
            dispatch(actions.getPermissions())
            dispatch(actions.getFunctions(searchParamsObject))
            setShouldRefetch(false)
        } else {
            dispatch(actions.getMenus())
            dispatch(actions.getPermissions())
            dispatch(actions.getFunctions(searchParamsObject))
        }
    }, [dispatch, permis, shouldRefetch])

    const renderTableRow = (item) => {
        const handleClickRow = () => {
            setPayload({ ...payload, id: item.id, url: item.url, name: item.name, idPermission: item.idPermission });
        };
        return (
            <>
                <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                    <td className={`${styletd}`}>{item.id}</td>
                    <td className={styletd}>{item.url}</td>
                    <td className='py-2'>{item.name}</td>
                    <td className={styletd}>{item.idPermission}</td>
                    {functions?.length > 0 && functions.map(item => item.name === 'Delete' && item.idPermission === 1 && (
                        <th className='w-[5%]'>
                            <Button
                                IcAfter={MdOutlineDeleteSweep}
                                value={item.id}
                                onClick={handleSubmitDelete}
                            />
                        </th>
                    ))}
                </tr>
            </>
        );
    };

    return (
        <div className='menu'>
            <div className='header-menu between'>
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
                <div className='form-menu'>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'URL'}
                        value={payload.url}
                        setValue={setPayload}
                        keyPayload={'url'}
                        type='text'
                    />
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
                        <label className='text-xs mt-4'>PERMISSION</label>
                        <select value={payload.idPermission}
                            onChange={(e) => setPayload({ ...payload, idPermission: e.target.value })}
                            className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
                            <option value="">Select PERMISSION</option>
                            {permissions?.length > 0 && permissions.map(item => (
                                <option value={item.id}>{item.id} - {item.name}</option>
                            ))}
                        </select>
                    </div>
                    {payload.id ? (
                        <div className='update-menu'>
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
            <div className='list-menu list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>URL</th>
                            <th>NAME</th>
                            <th>PERMISSION</th>
                            {functions?.length > 0 && functions.map(item => item.name === 'Delete' && item.idPermission === 1 && (
                                <th className='w-[5%]'></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {shouldReload && filteredMenus.length > 0 && filteredMenus.map((item) => renderTableRow(item))}
                        {!shouldReload && Array.isArray(menus) && menus?.length > 0 && menus.map((item) => renderTableRow(item))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Menu