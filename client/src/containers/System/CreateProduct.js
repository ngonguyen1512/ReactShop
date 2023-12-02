import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm, TextArea } from '../../components'
import icons from '../../utils/icons'
import Swal from 'sweetalert2';
import { path } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const { TiDeleteOutline, MdOutlineDeleteSweep } = icons;
const styletd = 'text-center py-2 '

const CreateProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("")
  const [shouldReload, setShouldReload] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { products, msg } = useSelector(state => state.menu)
  const { currentData } = useSelector(state => state.user)
  const { states } = useSelector(state => state.state)
  const { samples } = useSelector(state => state.sample)
  const permis = currentData.idPermission

  const [payload, setPayload] = useState({
    id: '' || null, idCategory: '', idSample: '', name: '',
    discount: '', price: '', information: '', idState: ''
  })

  const handleCreateClick = () => {
    navigate(path.CREATE_INFO);
  };

  useEffect(() => {
    dispatch(actions.getStates())
    dispatch(actions.getAllSamples())
  }, [dispatch])

  return (
    <div className='create_product'>
      <div>
        <label className='text-xs mt-4'>SAMPLE</label>
        <select value={payload.idSample}
          onChange={(e) => setPayload({ ...payload, idSample: e.target.value })}
          className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
          <option value="">Select SAMPLE</option>
          {samples?.length > 0 && samples.map(item => (
            <option value={item.id}>{item.id} - {item.name}</option>)
          )}
        </select>
      </div>
      <InputForm
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label={'NAME'}
        value={payload.name}
        setValue={setPayload}
        keyPayload={'name'}
        type='text'
      />
      <InputForm
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label={'DISCOUNT'}
        value={payload.discount}
        setValue={setPayload}
        keyPayload={'discount'}
        type='number'
      />
      <InputForm
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label={'PRICE'}
        value={payload.price}
        setValue={setPayload}
        keyPayload={'price'}
        type='number'
      />
      <div>
        <label className='text-xs mt-4'>STATE</label>
        <select value={payload.idState}
          onChange={(e) => setPayload({ ...payload, idState: e.target.value })}
          className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
          <option value="">Select STATE</option>
          {states?.length > 0 && states.map(item => (
            <option value={item.id}>{item.id} - {item.name}</option>
          ))}
        </select>
      </div>
      <TextArea
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label={'INFORMATION'}
        value={payload.information}
        setValue={setPayload}
        keyPayload={'information'}
        type='text'
      />
      <span className='show'></span>
      <Button
        class='col-span-2'
        text={'NEXT'}
        onClick={handleCreateClick}
      />
    </div>
  )
}

export default CreateProduct