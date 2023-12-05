import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'
import Swal from 'sweetalert2';

const { TiDeleteOutline, BiDetail } = icons;
const styletd = 'text-center py-2 '

const State = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("")
  const [shouldReload, setShouldReload] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { states, msg } = useSelector(state => state.state)
  const { currentData } = useSelector(state => state.user)
  const { functions } = useSelector(state => state.function)
  const permis = currentData.idPermission

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setShouldReload(event.target.value !== "");
  };
  let filteredStates = [];
  if (states && Array.isArray(states)) {
    filteredStates = states.filter((item) =>
      item.name.includes(searchValue)
    );
  }

  const [payload, setPayload] = useState({
    id: '' || null, name: ''
  })
  const handleSubmitCreate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createStates(payload))
      setPayload({ id: '', name: '' })
      setShouldRefetch(true)
    }
  }
  const handleSubmitUpdate = async () => {
    dispatch(actions.updateStates(payload))
    setPayload({ id: '', name: '' })
    setShouldRefetch(true)
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
    let searchParamsObject = {}
    if (permis) searchParamsObject.permis = permis
    if (shouldRefetch) {
      dispatch(actions.getStates())
      dispatch(actions.getFunctions(searchParamsObject))
      setShouldRefetch(false)
    } else {
      dispatch(actions.getStates())
      dispatch(actions.getFunctions(searchParamsObject))
    }
  }, [dispatch, permis, shouldRefetch])

  const renderTableRow = (item) => {
    const handleClickRow = () => {
      setPayload({ ...payload, id: item.id, name: item.name });
    };
    return (
      <>
        <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
          <td className={`${styletd}`}>{item.id}</td>
          <td className={styletd}>{new Date(item.createdAt).toLocaleDateString()}</td>
          <td className='py-2'>{item.name}</td>
        </tr>
      </>
    );
  };

  return (
    <div className='state'>
      <div className='header-state between'>
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
        <div className='form-state'>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'NAME'}
            value={payload.name}
            setValue={setPayload}
            keyPayload={'name'}
            type='text'
          />
          <span className='hide'></span>
          {payload.id ? (
            <div className='update-category'>
              <Button
                fullWidth
                text={'UPDATE'}
                value={payload.id}
                onClick={handleSubmitUpdate}
              />
              <span onClick={() => setPayload({ ...payload, id: '', name: '' })}
                className='icons-clear center'>
                <TiDeleteOutline />
              </span>
            </div>
          ) : (
            <Button
              class='col-span-2'
              text={'CREATE'}
              onClick={handleSubmitCreate}
            />
          )}
        </div>
      ))}
      <div className='list-state list-table'>
        <table className='w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>NAME</th>
            </tr>
          </thead>
          <tbody>
            {shouldReload && filteredStates.length > 0 && filteredStates.map((item) => renderTableRow(item))}
            {!shouldReload && Array.isArray(states) && states?.length > 0 && states.map((item) => renderTableRow(item))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default State