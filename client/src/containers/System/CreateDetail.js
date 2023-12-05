import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import Swal from 'sweetalert2';
import { path } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const CreateDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [invalidFields, setInvalidFields] = useState([])
  const { states } = useSelector(state => state.state)
  const { colors } = useSelector(state => state.color)
  const { products } = useSelector(state => state.product)
  const { dimensions } = useSelector(state => state.dimension)

  const [payload, setPayload] = useState({ idProduct: '', idColor: '', idSize: '', quantity: '', idState: '' })
  const [payload2, setPayload2] = useState({ idProduct: '', idColor: '', idSize: '', quantity: '', idState: '' })
  const [payload3, setPayload3] = useState({ idProduct: '', idColor: '', idSize: '', quantity: '', idState: '' })

  const handleSubmitCreate = async () => {
    dispatch(actions.createQuantities(payload))
    dispatch(actions.createQuantities(payload2))
    dispatch(actions.createQuantities(payload3))
    Swal.fire({
      title: 'Bạn có muốn thêm detail tiếp hay chuyển thêm ảnh?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Thêm ảnh',
      cancelButtonText: 'Thêm tiếp',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(path.CREATE_IMAGE); // Chuyển đến trang create_image
      } else {
        setPayload([]); setPayload2([]); setPayload3([]);
        navigate(path.CREATE_DETAIL, { replace: true });
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    dispatch(actions.getStates())
    dispatch(actions.getColors())
    dispatch(actions.getProducts())
    dispatch(actions.getDimensions())
  }, [dispatch])

  return (
    <div className='create_detail'>
      <span className='title'>DETAIL 1</span>
      <div className='form-create_detail'>
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
        <div>
          <label className='text-xs mt-4'>SIZE</label>
          <select
            value={payload.idSize}
            onChange={(e) => setPayload({ ...payload, idSize: e.target.value })}
            className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'
          >
            <option value="">Select SIZE</option>
            {dimensions?.length > 0 &&
              dimensions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id} - {item.name}
                </option>
              ))}
          </select>
        </div>
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
      </div>
      <span className='title'>DETAIL 2</span>
      <div className='form-create_detail'>
        <div>
          <label className='text-xs mt-4'>PRODUCT</label>
          <select
            value={payload2.idProduct}
            onChange={(e) => setPayload2({ ...payload2, idProduct: e.target.value })}
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
        <div>
          <label className='text-xs mt-4'>COLOR</label>
          <select
            value={payload2.idColor}
            onChange={(e) => setPayload2({ ...payload2, idColor: e.target.value })}
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
        <div>
          <label className='text-xs mt-4'>SIZE</label>
          <select
            value={payload2.idSize}
            onChange={(e) => setPayload2({ ...payload2, idSize: e.target.value })}
            className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'
          >
            <option value="">Select SIZE</option>
            {dimensions?.length > 0 &&
              dimensions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id} - {item.name}
                </option>
              ))}
          </select>
        </div>
        <InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={'QUANTITY'}
          value={payload2.quantity}
          setValue={setPayload2}
          keyPayload={'quantity'}
          type='number'
        />
        <div>
          <label className='text-xs mt-4'>STATE</label>
          <select
            value={payload2.idState}
            onChange={(e) => setPayload2({ ...payload2, idState: e.target.value })}
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
      </div>
      <span className='title'>DETAIL 3</span>
      <div className='form-create_detail'>
        <div>
          <label className='text-xs mt-4'>PRODUCT</label>
          <select
            value={payload3.idProduct}
            onChange={(e) => setPayload3({ ...payload3, idProduct: e.target.value })}
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
        <div>
          <label className='text-xs mt-4'>COLOR</label>
          <select
            value={payload3.idColor}
            onChange={(e) => setPayload3({ ...payload3, idColor: e.target.value })}
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
        <div>
          <label className='text-xs mt-4'>SIZE</label>
          <select
            value={payload3.idSize}
            onChange={(e) => setPayload3({ ...payload3, idSize: e.target.value })}
            className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'
          >
            <option value="">Select SIZE</option>
            {dimensions?.length > 0 &&
              dimensions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id} - {item.name}
                </option>
              ))}
          </select>
        </div>
        <InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={'QUANTITY'}
          value={payload3.quantity}
          setValue={setPayload3}
          keyPayload={'quantity'}
          type='number'
        />
        <div>
          <label className='text-xs mt-4'>STATE</label>
          <select
            value={payload3.idState}
            onChange={(e) => setPayload3({ ...payload3, idState: e.target.value })}
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

      </div>
      <div className='center mt-5'>
        <Button text={'CREATE'} onClick={handleSubmitCreate} />
      </div>
    </div>
  )
}

export default CreateDetail