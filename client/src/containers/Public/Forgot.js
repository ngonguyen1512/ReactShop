import React, { useState } from 'react'
import { InputForm, Button } from "../../components"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { path } from '../../utils/constant'

const Forgot = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { msg } = useSelector(state => state.auth)
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({phone: '', email: ''});

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

    return (
        <div className='bg-frame center'>
            <div className='frame'>
                <h3 className='title'>FORGOT PASSWORD</h3>
                <div className='forminput'>
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
                </div>
                <div className="formbutton">
                    <Button
                        text='GET NEW PASSWORD'
                        fullWidth
                        // onClick={handleSubmit}
                    />
                    <div className='transit center'>
                        <small><span className='text'
                            onClick={() => { navigate('/' + path.LOGIN) }}>Back</span></small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot