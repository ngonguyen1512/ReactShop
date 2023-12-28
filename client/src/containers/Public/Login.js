import Swal from 'sweetalert2';
import { path } from '../../utils/constant'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({
        phone: '', password: '',
    });

    const handleSubmit = async () => {
        let finalPayload = payload
        let invalids = validate(finalPayload);
        if (invalids === 0) dispatch(actions.login(payload));
    }

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
                    case 'password': {
                        if (item[1].length < 6) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                msg: 'Password is at least 6 characters!'
                            }])
                            invalids++;
                        }
                        break;
                    }
                    case 'phone': {
                        if (!+item[1]) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                msg: 'Invalid phone number!'
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

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn, navigate])

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error')
    }, [msg, update])

    return (
        <div className='bg-frame center'>
            <div className='frame'>
                <h3 className='title'>LOGIN</h3>
                <div className='forminput'>
                    <InputForm type='tel'
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'PHONE'}
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                    />
                    <InputForm type='password'
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'PASSWORD'}
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={'password'}
                    />
                </div>
                <div className='formbutton'>
                    <Button text='LOGIN' fullWidth onClick={handleSubmit}/>
                </div>
                <div className='transit between'>
                    <small className='text'
                        onClick={() => { navigate('/' + path.FORGOT) }}>Forgot password</small>
                    <small className='text'
                        onClick={() => { navigate('/' + path.REGISTER) }}>Register an account</small>
                </div>
            </div>
        </div>
    )
}

export default Login