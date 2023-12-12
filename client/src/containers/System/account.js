import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'
import Swal from 'sweetalert2';

const { TiDeleteOutline, BiDetail, CiEdit } = icons;

const styletd = 'text-center py-2 '

const Account = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("")
  const [isShowDetail, setIsShowDetail] = useState(false)
  const [shouldReload, setShouldReload] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { currentData } = useSelector(state => state.user)
  const { states } = useSelector(state => state.state)
  const { functions } = useSelector(state => state.function)
  const { msg, update } = useSelector(state => state.auth)
  const { accounts } = useSelector(state => state.account)
  const { permissions } = useSelector(state => state.permission)
  const permis = currentData.idPermission

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredAccounts = [];
  if (accounts && Array.isArray(accounts)) {
    const searchRegex = new RegExp(searchValue, 'i');
    filteredAccounts = accounts.filter((item) =>
      searchRegex.test(item.name)
    );
  }

  const [payload, setPayload] = useState({
    id: '' || null, name: '', phone: '', email: '', address: '',
    password: '', idPermission: '', idState: ''
  });
  const handleSubmitCreate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createAccount(payload))
      setShouldRefetch(true);
    }
  }

  const [payloadu, setPayloadu] = useState({
    id: '', idPermission: '', idState: '',
  });

  const handleSubmitUpdate = async () => {
    let canUpdate = true;
    accounts?.length > 0 &&
      accounts.forEach((item) => {
        if (payloadu.id === item.id && item.idPermission === 4) {
          canUpdate = false;
          Swal.fire('Oops !', "You can't change customer status or permission.", 'error');
        }
      });
    if (canUpdate) {
      dispatch(actions.updateAccountsByAdmin(payloadu));
      setShouldRefetch(true);
    }
  };
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
      } else if (item[1] !== '') {
        switch (item[0]) {
          case 'password': {
            if (item[1].length < 4) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Password at least 4 characters!'
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
          case 'idPermission': {
            if (+item[1] !== 2 && +item[1] !== 3) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Invalid permission code!'
              }]);
              invalids++;
            }
            break;
          }
          default:
            break;
        }
      }
    })
    return invalids;
  }

  useEffect(() => {
    msg && Swal.fire('Oops !', msg, 'error');
  }, [msg, update]);

  useEffect(() => {
    let searchParamsObject = {}
    if (permis) searchParamsObject.permis = permis
    if (shouldRefetch) {
      dispatch(actions.getStates())
      dispatch(actions.getAccounts())
      dispatch(actions.getPermissions())
      dispatch(actions.getFunctions(searchParamsObject))
      setShouldRefetch(false)
    } else {
      dispatch(actions.getStates())
      dispatch(actions.getAccounts())
      dispatch(actions.getPermissions())
      dispatch(actions.getFunctions(searchParamsObject))
    }
  }, [dispatch, permis, shouldRefetch])

  const [payloada, setPayloada] = useState({ id: '' || null })
  const renderTableRow = (item) => {
    const handleClickRow = () => {
      setPayload({ ...payload, id: item.id });
      setPayloadu({ ...payloadu, id: item.id, idPermission: item.idPermission, idState: item.idState });
    };
    const handleDetail = (e) => {
      e.stopPropagation();
      if (payloada.id === item.id) {
        setPayloada({ id: null });
        setIsShowDetail(false);
      } else {
        setPayloada({ ...payloada, id: item.id });
        setIsShowDetail(true);
      }
    };
    return (
      <>
        <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
          <td className={`w-[4%] ${styletd}`}>{item.id}</td>
          <td className={styletd}>{new Date(item.createdAt).toLocaleDateString()}</td>
          <td className='py-2'>{item.name}</td>
          <td className={styletd}>{item.phone}</td>
          <td className={styletd}>{item.idPermission}</td>
          <td className={styletd}>{item.idState}</td>
          <td className={`w-[8%] ${styletd}`}>
            <Button fullWidth
              IcAfter={BiDetail}
              value={payloada.id}
              setValue={setPayloada}
              onClick={(e) => handleDetail(e)}
            />
          </td>
        </tr>
        {isShowDetail && payloada.id === item.id && (
          <tr className='bg-[#ddd]'>
            <td className='w-[4%]'></td>
            <td colSpan={2} className={styletd}>{item.email}</td>
            <td colSpan={4} className={styletd}>{item.address}</td>
          </tr>
        )}
      </>
    );
  };

  return (
    <div className='account'>
      <div className='header-account between'>
        <span></span>
        <input
          className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
          type="text"
          placeholder='Search by name'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
        <div className='form-account'>
          {payload.id && (
            <>
              <div>
                <label className='text-xs mt-4'>PERMISSION</label>
                <select value={payloadu.idPermission}
                  onChange={(e) => setPayloadu({ ...payloadu, idPermission: e.target.value })}
                  className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
                  <option value="">Select PERMISSION</option>
                  {permissions?.length > 0 && permissions.map(item => item.idState === 2 && (
                    <option value={item.id}>{item.id} - {item.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='text-xs mt-4'>STATE</label>
                <select value={payloadu.idState}
                  onChange={(e) => setPayloadu({ ...payloadu, idState: e.target.value })}
                  className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 rounded-md w-full cursor-pointer'>
                  <option value="">Select STATE</option>
                  {states?.length > 0 && states.map(item => (item.id === 1 || item.id === 2) && (
                    <option value={item.id}>{item.id} - {item.name}</option>
                  ))}
                </select>
              </div>
              <span></span>
              <div className='update-category'>
                <Button
                  fullWidth
                  class='col-span-2'
                  text={'UPDATE'}
                  value={payloadu.id}
                  setValue={setPayloadu}
                  onClick={handleSubmitUpdate}
                />
                <span onClick={() => setPayload({ ...payload, id: '', idCategory: '', name: '', idState: '' })}
                  className='icons-clear center'>
                  <TiDeleteOutline />
                </span>
              </div>
            </>
          )}
          {!payload.id && (
            <>
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
              <div>
                <label className='text-xs mt-4'>PERMISSION</label>
                <select value={payload.idPermission}
                  onChange={(e) => setPayload({ ...payload, idPermission: e.target.value })}
                  className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
                  <option value="">Select PERMISSION</option>
                  {permissions?.length > 0 && permissions.map(item => (
                    <option value={item.id}>{item.id} - {item.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='text-xs mt-4'>STATE</label>
                <select value={payload.idState}
                  onChange={(e) => setPayload({ ...payload, idState: e.target.value })}
                  className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 rounded-md w-full cursor-pointer'>
                  <option value="">Select STATE</option>
                  {states?.length > 0 && states.map(item => (item.id === 1 || item.id === 2) && (
                    <option value={item.id}>{item.id} - {item.name}</option>
                  ))}
                </select>
              </div>
              <Button
                fullWidth
                class='col-span-2'
                text={'CREATE'}
                onClick={handleSubmitCreate}
              />
            </>
          )}
        </div>
      ))}
      <div className='list-account list-table'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='w-[4%]'>ID</th>
              <th>DATE</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>PERMIS</th>
              <th>STATE</th>
              <th className='w-[8%]'>DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {shouldReload && filteredAccounts.length > 0 && filteredAccounts.map((item) => renderTableRow(item))}
            {!shouldReload && Array.isArray(accounts) && accounts?.length > 0 && accounts.map((item) => renderTableRow(item))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Account