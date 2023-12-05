import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import Swal from 'sweetalert2';
import { path } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const CreateImage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [invalidFields, setInvalidFields] = useState([])
    const { states } = useSelector(state => state.state)
    const { colors } = useSelector(state => state.color)
    const { products } = useSelector(state => state.product)

    const [payload, setPayload] = useState({
        idProduct: '', idColor: '', image1: '', image2: '', image3: '', image4: ''
    })

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
        finalPayload = {
            ...payload, image1: file.name, image2: file.name, image3: file.name, image4: file.name,
        };
        dispatch(actions.createImages(finalPayload)).then(() => {
            uploadFileAndDispatch(file)
                .then(response => {
                    console.log('File uploaded to server:', response.data);
                }).catch(error => {
                    console.error('Error uploading file:', error);
                });
        }).catch(error => {
            console.error('Error dispatching action:', error);
        });
        Swal.fire({
            title: 'Bạn có muốn thêm ảnh tiếp hay hoành thành?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Hoành thành',
            cancelButtonText: 'Thêm tiếp',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(path.PRODUCT);
            } else {
                setPayload([]);
                navigate(path.CREATE_IMAGE, { replace: true });
                window.location.reload();
            }
        });
    }

    useEffect(() => {
        dispatch(actions.getColors())
        dispatch(actions.getProducts())
    }, [dispatch])

    return (
        <div className='create_image mt-[15%]'>
            <div className='form-create_image'>
                <div>
                    <label className='text-xs mt-4'>PRODUCT</label>
                    <select
                        value={payload.idProduct}
                        onChange={(e) => setPayload({ ...payload, idProduct: e.target.value })}
                        className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'
                    >
                        <option value="">Select PRODUCT</option>
                        {products?.length > 0 &&
                            products.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.id} - {item.name}
                                </option>
                            ))}
                    </select>
                </div>
                <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    label={'IMAGE 1'}
                    value={payload.image1}
                    setValue={setPayload}
                    keyPayload={'image1'}
                    type='file'
                />
                <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    label={'IMAGE 2'}
                    value={payload.image2}
                    setValue={setPayload}
                    keyPayload={'image2'}
                    type='file'
                />
                <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    label={'IMAGE 3'}
                    value={payload.image3}
                    setValue={setPayload}
                    keyPayload={'image3'}
                    type='file'
                />
                <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    label={'IMAGE 4'}
                    value={payload.image4}
                    setValue={setPayload}
                    keyPayload={'image4'}
                    type='file'
                />
                <div>
                    <label className='text-xs mt-4'>COLOR</label>
                    <select
                        value={payload.idColor}
                        onChange={(e) => setPayload({ ...payload, idColor: e.target.value })}
                        className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'
                    >
                        <option value="">Select COLOR</option>
                        {colors?.length > 0 &&
                            colors.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.id} - {item.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <div className='center mt-5'>
                <Button text={'CREATE'} onClick={handleSubmitCreate} />
            </div>
        </div>
    )
}

export default CreateImage