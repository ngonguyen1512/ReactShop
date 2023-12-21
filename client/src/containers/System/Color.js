import Swal from 'sweetalert2'
import icons from '../../utils/icons'
import * as actions from '../../store/actions'
import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useDispatch, useSelector } from 'react-redux'

const { TiDeleteOutline } = icons
const styletd = 'text-center px-4 py-2 '

const Color = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { colors, msg } = useSelector(state => state.color)
    const { states } = useSelector(state => state.state)
    const { currentData } = useSelector(state => state.user)
    const { functions } = useSelector(state => state.function)
    const permis = currentData.idPermission

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredColors = [];
    if (colors && Array.isArray(colors)) {
        const searchRegex = new RegExp(searchValue, 'i');
        filteredColors = colors.filter((item) =>
            searchRegex.test(item.name)
        );
    }

    const [payload, setPayload] = useState({
        id: '' || null, code: '', name: '', idState: ''
    });
    const handleSubmitCreate = async () => {
        let finalPayload = payload;
        let invalids = validate(finalPayload);
        if (invalids === 0) {
            dispatch(actions.createColors(payload))
            setPayload({ id: '', code: '', name: '', idState: '' })
            setShouldRefetch(true)
        }
    }
    const handleSubmitUpdate = async () => {
        dispatch(actions.updateColors(payload))
        setPayload({ id: '', code: '', name: '', idState: '' })
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
            dispatch(actions.getColors())
            dispatch(actions.getStates())
            dispatch(actions.getFunctions(searchParamsObject))
            setShouldRefetch(false)
        } else {
            dispatch(actions.getColors())
            dispatch(actions.getStates())
            dispatch(actions.getFunctions(searchParamsObject))
        }
    }, [dispatch, permis, shouldRefetch])

    const renderTableRow = (item) => {
        const handleClickRow = () => {
            setPayload({ ...payload, id: item.id, code: item.code, name: item.name, idState: item.idState });
        };
        return (
            <>
                <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                    <td className={`w-[4%] ${styletd}`}>{item.id}</td>
                    <td className={styletd}>
                        <span style={{ marginRight: '8px', backgroundColor: item.code, width: '20px', height: '20px', display: 'inline-block' }}></span>
                        {item.code}</td>
                    <td className='py-2'>{item.name}</td>
                    <td className={styletd}>{item.idState}</td>
                </tr>
            </>
        );
    };

    return (
        <div className='color'>
            <div className='header-color between'>
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
                <div className='form-color'>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'CODE'}
                        value={payload.code}
                        setValue={setPayload}
                        keyPayload={'code'}
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
                    {payload.id ? (
                        <div className='update-color'>
                            <Button
                                fullWidth
                                text={'UPDATE'}
                                value={payload.id}
                                onClick={handleSubmitUpdate}
                            />
                            <span onClick={() => setPayload({ ...payload, id: '', idCategory: '', name: '', idState: '' })}
                                className='icons-clear center'>
                                <TiDeleteOutline />
                            </span>
                        </div>
                    ) : (
                        <Button
                            text={'CREATE'}
                            onClick={handleSubmitCreate}
                        />
                    )}
                </div>
            ))}
            <div className='list-color list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CODE</th>
                            <th>NAME</th>
                            <th>STATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shouldReload && filteredColors.length > 0 && filteredColors.map((item) => renderTableRow(item))}
                        {!shouldReload && Array.isArray(colors) && colors?.length > 0 && colors.map((item) => renderTableRow(item))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Color