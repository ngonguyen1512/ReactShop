import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'
import Swal from 'sweetalert2';
import { path } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const CreateInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("")
  const [shouldReload, setShouldReload] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { states } = useSelector(state => state.state)
  const { colors } = useSelector(state => state.color)
  const { products } = useSelector(state => state.product)
  const { dimensions } = useSelector(state => state.dimension)

  // const [payloadc, setPayloadc] = useState({ number: '' })

  const [payload, setPayload] = useState({
    number: '' || null,id: '' || null, idProduct: '', image: '', idColor: '', idSize: '', quantity: '', idState: ''
  })

  useEffect(() => {
    dispatch(actions.getStates())
    dispatch(actions.getColors());
    dispatch(actions.getDimensions())
    dispatch(actions.getProducts())
  })

  const generateDivs = () => {
    const divs = [];
    for (let i = 0; i < payload.number; i++) {
      divs.push(
        <div className='form-create_info' key={i}>
          <div>
            <label className='text-xs mt-4'>PRODUCT</label>
            <select value={payload.idProduct}
              onChange={(e) => setPayload({ ...payload, idProduct: e.target.value })}
              className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
              <option value="">Select PRODUCT</option>
              {products?.length > 0 && products.map(item => (
                <option value={item.id}>{item.id} - {item.name}</option>
              ))}
            </select>
          </div>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'IMAGE'}
            value={payload.image}
            setValue={setPayload}
            keyPayload={'image'}
            type='file'
          />
          <div>
            <label className='text-xs mt-4'>COLOR</label>
            <select value={payload.idColor}
              onChange={(e) => setPayload({ ...payload, idColor: e.target.value })}
              className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
              <option value="">Select COLOR</option>
              {colors?.length > 0 && colors.map(item => (
                <option value={item.id}>{item.id} - {item.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='text-xs mt-4'>SIZE</label>
            <select value={payload.idSize}
              onChange={(e) => setPayload({ ...payload, idSize: e.target.value })}
              className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
              <option value="">Select SIZE</option>
              {dimensions?.length > 0 && dimensions.map(item => (
                <option value={item.id}>{item.id} - {item.name}</option>
              ))}
            </select>
          </div>
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
        </div>
      );
    }
    return divs;
  };

  return (
    <div className='create_info'>
      <div className='header-create_info'>
        <InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={'NUMBER OF IMAGE'}
          value={payload.number}
          setValue={(value) => setPayload({ ...payload, number: value })}
          keyPayload={'number'}
          type='number'
        />
        <Button
          class='col-span-2'
          text={'Create number'}
        // onClick={handleSubmitCreate}
        />
      </div>
      {generateDivs()}
    </div>
  )
}

export default CreateInfo