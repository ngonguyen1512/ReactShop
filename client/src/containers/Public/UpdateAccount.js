import React, { useState } from 'react'
import { path } from '../../utils/constant'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom'
import { Button, InputForm } from '../../components'
import { useDispatch, useSelector } from 'react-redux'

const UpdateAccount = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [invalidFields, setInvalidFields] = useState([])
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)
  
  const [payload, setPayload] = useState({
    id: idcurrent, name: '', email: '', address: ''
  });
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, {
          name: item[0],
          msg: 'You must not vacate this field!'
        }])
        invalids++;
        return;
      } else if (item[1] !== '') {
        switch (item[0]) {
          case 'email': {
            if (!/\S+@\S+\.\S+/.test(item[1])) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Invalid email!'
              }])
              invalids++;
            }
            break;
          }
          default: break;
        }
      }
    })
    return invalids;
  }
  const handleSubmit = () => {
    let finalPayload = payload
    let invalids = validate(finalPayload);
    if (invalids === 0) dispatch(actions.updateAccountOne(payload));
    navigate('/'+path.PERSONAL)
    window.location.reload();
  }

  return (
    <div className='bg-frame center'>
      <div className='frame'>
        <div className='forminput'>
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
            label={'EMAIL'}
            value={payload.email}
            setValue={setPayload}
            keyPayload={'email'}
            type='email'
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'ADDRESS'}
            value={payload.address}
            setValue={setPayload}
            keyPayload={'address'}
            type='text'
          />
        </div>
        <div className='formbutton'>
          <Button
            text='UPDATE'
            fullWidth
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default UpdateAccount