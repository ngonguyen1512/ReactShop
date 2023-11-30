import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'
import Swal from 'sweetalert2';

const { TiDeleteOutline, MdOutlineDeleteSweep } = icons;
const styletd = 'text-center px-4 py-2 '

const Slide = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { states } = useSelector(state => state.state)
    const { slides, msg } = useSelector(state => state.slide)
    const { currentData } = useSelector(state => state.user)
    const { functions } = useSelector(state => state.function)
    const permis = currentData.idPermission

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredSlides = [];
    if (slides && Array.isArray(slides)) {
        filteredSlides = slides.filter((item) =>
            item.name.includes(searchValue)
        );
    }

    const [payload, setPayload] = useState({
        id: '' || null, image: '', name: '', idState: ''
    });
    const uploadFileAndDispatch = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return axios.post('http://localhost:5000/api/v1/image/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    };
    const handleSubmitCreate = async () => {
        let finalPayload = { ...payload };
        let fileInput = document.querySelector('input[type="file"]');
        let file = fileInput.files[0];
        finalPayload.image = file.name; // Use the file name directly
        let invalids = validate(finalPayload);
        if (invalids === 0) {
            dispatch(actions.createSlides(finalPayload)).then(() => {
                uploadFileAndDispatch(file)
                    .then(response => {
                        console.log('File uploaded to server:', response.data);
                    }).catch(error => {
                        console.error('Error uploading file:', error);
                    });
                setPayload({ id: '', name: '', image: '', idState: '' })
                setShouldRefetch(true)
            }).catch(error => {
                console.error('Error dispatching action:', error);
            });
        }
    }
    const handleSubmitUpdate = async () => {
        let finalPayload = { ...payload };
        let fileInput = document.querySelector('input[type="file"]');
        let file = fileInput.files[0];
        finalPayload.image = file.name; // Use the file name directly
        let invalids = validate(finalPayload);
        if (invalids === 0) {
            dispatch(actions.updateSlides(finalPayload)).then(() => {
                uploadFileAndDispatch(file)
                    .then(response => {
                        console.log('File uploaded to server:', response.data);
                    }).catch(error => {
                        console.error('Error uploading file:', error);
                    });
                setPayload({ id: '', name: '', image: '', idState: '' })
                setShouldRefetch(true)
            }).catch(error => {
                console.error('Error dispatching action:', error);
            });
        }
    }
    const handleSubmitDelete = async () => {
        dispatch(actions.deleteSlides(payload))
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
        let searchParamsObject = {}
        if (permis) searchParamsObject.permis = permis
        if (shouldRefetch) {
            dispatch(actions.getSlides())
            dispatch(actions.getStates())
            dispatch(actions.getFunctions(searchParamsObject))
            setShouldRefetch(false)
        } else {
            dispatch(actions.getSlides())
            dispatch(actions.getStates())
            dispatch(actions.getFunctions(searchParamsObject))
        }
    }, [dispatch, permis, shouldRefetch])

    const renderTableRow = (item) => {
        const handleClickRow = () => {
            setPayload({ ...payload, id: item.id, name: item.name, idState: item.idState });
        };
        return (
            <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                <td className={`${styletd}`}>{item.id}</td>
                <td className='w-[20%]'>
                    <img src={`/images/${item.image}`} alt={item.name} className='w-[100%] object-cover' />
                </td>
                <td className='px-4 py-2'>{item.name}</td>
                <td className={styletd}>{item.idState}</td>
                {functions?.length > 0 && functions.map(item => item.name === 'Delete' && item.idPermission === 1 && (
                    <th className='w-[8%]'>
                        <Button
                            IcAfter={MdOutlineDeleteSweep}
                            value={item.id}
                            onClick={handleSubmitDelete}
                        />
                    </th>
                ))}
            </tr>
        );
    }

    return (
        <div className='slide'>
            <div className='header-slide between'>
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
                <div className='form-slide'>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'IMAGE'}
                        value={payload.image}
                        setValue={setPayload}
                        keyPayload={'image'}
                        type='file'
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
                                text={'UPDATE'}
                                value={payload.id}
                                onClick={handleSubmitUpdate}
                            />
                            <span onClick={() => setPayload({ ...payload, id: '', image: '', name: '', idState: '' })}
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
            <div className='list-slide list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>IMAGE</th>
                            <th>NAME</th>
                            <th>STATE</th>
                            {functions?.length > 0 && functions.map(item => item.name === 'Delete' && item.idPermission === 1 && (
                                <th className='w-[8%]'></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {shouldReload && filteredSlides.length > 0 && filteredSlides.map((item) => renderTableRow(item))}
                        {!shouldReload && Array.isArray(slides) && slides?.length > 0 && slides.map((item) => renderTableRow(item))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Slide