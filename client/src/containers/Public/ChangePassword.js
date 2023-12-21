import React, { useState } from 'react'
import { path } from '../../utils/constant'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom'
import { Button, InputForm } from '../../components'
import { useDispatch, useSelector } from 'react-redux'

const ChangePassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [invalidFields, setInvalidFields] = useState([])
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)

  const [payload, setPayload] = useState({
    id: idcurrent, passwordold: '', passwordnew: '',
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
          case 'passwordold':
          case 'passwordnew': {
            if (item[1].length < 6) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Password is at least 6 characters!'
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
    if (invalids === 0) dispatch(actions.updateAccountPassword(payload));
    dispatch(actions.logout())
    navigate('/' + path.LOGIN)
  }

  return (
    <div className='bg-frame center'>
      <div className='frame'>
        <div className='forminput'>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'PASSWORD OLD'}
            value={payload.passwordold}
            setValue={setPayload}
            keyPayload={'passwordold'}
            type='password'
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'PASSWORD NEW'}
            value={payload.passwordnew}
            setValue={setPayload}
            keyPayload={'passwordnew'}
            type='password'
          />
        </div>

        <div className='formbutton'>
          <Button
            text='CHANGE'
            fullWidth
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default ChangePassword