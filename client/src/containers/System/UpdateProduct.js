import { path } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, InputForm, TextArea } from '../../components'

const UpdateProduct = (item) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { states } = useSelector(state => state.state)
  const { samples } = useSelector(state => state.sample)
  const [invalidFields, setInvalidFields] = useState([])
  const { categories } = useSelector(state => state.category)

  const [payload, setPayload] = useState({
    id: item.id || '', name: item.name || '', idCategory: item.idCategory || '', idSample: item.idSample || '',
    discount: item.discount || '', price: item.price || '', information: item.information || '', idState: item.idState || ''
  })

  const handleSubmitUpdate = () => {
    dispatch(actions.updateProducts(payload))
    navigate(path.PRODUCT)
  }

  useEffect(() => {
    dispatch(actions.getStates())
    dispatch(actions.getAllSamples())
    dispatch(actions.getCategories())
    dispatch(actions.getProducts())
  }, [dispatch])

  return (
    <div className='update_product'>
      <div className='form-update_product'>
        <div>
          <label className='text-xs mt-4'>CATEGORY</label>
          <select value={payload.idCategory}
            onChange={(e) => setPayload({ ...payload, idCategory: e.target.value })}
            className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
            <option value="">Select CATEGORY</option>
            {categories?.length > 0 && categories.map(item => (
              <option value={item.id}>{item.id} - {item.name}</option>)
            )}
          </select>
        </div>
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
            {states?.length > 0 && states.map(item => (item.id === 1 || item.id === 2) && (
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
      </div>
      <div className='center mt-5'>
        <Button text={'UPDATE'} onClick={handleSubmitUpdate} />
      </div>
    </div>
  )
}

export default UpdateProduct