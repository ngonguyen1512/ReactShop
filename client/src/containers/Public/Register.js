import Swal from 'sweetalert2'
import { path } from '../../utils/constant'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { InputForm, Button } from "../../components"
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.auth)
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({
        name: '', phone: '', email: '', address: '',
        password: '', idPermission: '4', idState: '2'
    });

    const handleSubmit = async () => {
        let finalPayload = payload
        let invalids = validate(finalPayload);
        if (invalids === 0) { 
            dispatch(actions.register(payload));
            Swal.fire({
                title: 'Success!', text: 'Create account successful.',
                icon: 'success', timer: 1000,
                showConfirmButton: false
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
                    msg: 'You must not vacate this field!'
                }])
                invalids++;
                return;
            } else if (item[1] !== '') {
                switch (item[0]) {
                    case 'password': {
                        if (item[1].length < 4) {
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

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn, navigate]);

    return (
        <div className='bg-frame center'>
            <div className='frame'>
                <h3 className='title'>REGISTER</h3>
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
                        label={'PHONE'}
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                        type='tel'
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
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'PASSWORD'}
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={'password'}
                        type='password'
                    />
                </div>
                <div className='formbutton'>
                    <Button
                        text={'REGISTER'}
                        fullWidth
                        onClick={handleSubmit}
                    />
                </div>
                <div className='transit'>
                    <small>Do you have an account? <span className='text'
                        onClick={() => { navigate('/' + path.LOGIN) }}>Login now</span></small>
                </div>
            </div>
        </div>
    )
}

export default Register;