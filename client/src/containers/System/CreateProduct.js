import Swal from 'sweetalert2'
import { path } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, InputForm, TextArea } from '../../components'

const CreateProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { msg } = useSelector(state => state.product)
  const { states } = useSelector(state => state.state)
  const { samples } = useSelector(state => state.sample)
  const [invalidFields, setInvalidFields] = useState([])
  const { categories } = useSelector(state => state.category)

  const [payload, setPayload] = useState({
    id: '' || null, idCategory: '', idSample: '', name: '',
    discount: '', price: '', information: '', idState: ''
  })

  const handleSubmitCreate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createProducts(payload))
      Swal.fire({
        title: 'Bạn có muốn thêm detail product hay thêm detail accessories hay thoát?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Thêm detail',
        cancelButtonText: 'Thoát',
      }).then((result) => {
        if (result.isConfirmed) {
          setPayload([]);
          navigate(path.CREATE_DETAIL, { replace: true })
        } else {
          navigate(path.PRODUCT)
        }
      });
    }
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
    dispatch(actions.getStates())
    dispatch(actions.getAllSamples())
    dispatch(actions.getCategories())
  }, [dispatch])

  return (
    <div className='create_product mt-[5%]'>
      <div className='form-create_product'>
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
        <InputForm type='text'
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={'NAME'}
          value={payload.name}
          setValue={setPayload}
          keyPayload={'name'}
        />
        <InputForm type='number'
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={'DISCOUNT'}
          value={payload.discount}
          setValue={setPayload}
          keyPayload={'discount'}
        />
        <InputForm type='number'
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={'PRICE'}
          value={payload.price}
          setValue={setPayload}
          keyPayload={'price'}
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
        <TextArea type='text'
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={'INFORMATION'}
          value={payload.information}
          setValue={setPayload}
          keyPayload={'information'}
        />
      </div>
      <div className='center mt-5'>
        <Button text={'NEXT'} onClick={handleSubmitCreate} />
      </div>
    </div>
  )
}

export default CreateProduct