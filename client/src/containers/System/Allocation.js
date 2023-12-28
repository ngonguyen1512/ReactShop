import icons from '../../utils/icons'
import * as actions from '../../store/actions'
import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useDispatch, useSelector } from 'react-redux'

const styletd = 'text-center py-2 '
const { TiDeleteOutline, MdOutlineDeleteSweep } = icons

const Allocations = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("")
  const [invalidFields, setInvalidFields] = useState([])
  const [shouldReload, setShouldReload] = useState(false)
  const { currentData } = useSelector(state => state.user)
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { functions } = useSelector(state => state.function)
  const { transfers } = useSelector(state => state.transfer)
  const { allallocations } = useSelector(state => state.allocation)
  const permis = currentData.idPermission

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setShouldReload(event.target.value !== "");
  };
  let filteredAllocations = [];
  if (allallocations && Array.isArray(allallocations)) {
    const searchRegex = new RegExp(searchValue, 'i');
    filteredAllocations = allallocations.filter((item) =>
      searchRegex.test(item.name)
    );
  }

  const [payload, setPayload] = useState({
    id: '' || null, idTransfer: '', name: ''
  })
  const handleSubmitCreate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createAllocations(payload))
      setPayload({ id: '', idTransfer: '', name: '' })
      setShouldRefetch(true)
    }
  }
  const handleSubmitUpdate = async () => {
    dispatch(actions.updateAllocations(payload))
    setPayload({ id: '', idTransfer: '', name: '' })
    setShouldRefetch(true)
  }
  const handleSubmitDelete = async () => {
    dispatch(actions.deleteAllocations(payload))
    setShouldRefetch(true);
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
    let searchParamsObject = {}
    if (permis) searchParamsObject.permis = permis
    if (shouldRefetch) {
      dispatch(actions.getTransfers())
      dispatch(actions.getAllsAllocations())
      dispatch(actions.getFunctions(searchParamsObject))
      setShouldRefetch(false)
    } else {
      dispatch(actions.getTransfers())
      dispatch(actions.getAllsAllocations())
      dispatch(actions.getFunctions(searchParamsObject))
    }
  }, [dispatch, permis, shouldRefetch])

  const renderTableRow = (item) => {
    const handleClickRow = () => {
      setPayload({ ...payload, id: item.id, name: item.name, idTransfer: item.idTransfer });
    };
    return (
      <>
        <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
          <td className={`${styletd}`}>{item.id}</td>
          <td className='py-2'>{item.idTransfer} - {item?.allocation_transfer.name}</td>
          <td className='py-2'>{item.name}</td>
          {functions?.length > 0 && functions.map(items => items.name === 'Delete' && items.idPermission === 1 && (
            <th className='w-[5%]'>
              <Button
                IcAfter={MdOutlineDeleteSweep}
                value={item.id}
                onClick={handleSubmitDelete}
              />
            </th>
          ))}
        </tr>
      </>
    );
  };

  return (
    <div className='allocation'>
      <div className='header-allocation end'>
        <input type="text"
          className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
          placeholder='Search by name'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
        <div className='form-allocation'>
          <div>
            <label className='text-xs mt-4'>TRANSFER</label>
            <select value={payload.idTransfer}
              onChange={(e) => setPayload({ ...payload, idTransfer: e.target.value })}
              className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
              <option value="">Select TRANSFER</option>
              {transfers?.length > 0 && transfers.map(items => (
                <option value={items.id}>{items.id} - {items.name}</option>
              ))}
            </select>
          </div>
          <InputForm type="text"
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'NAME'}
            value={payload.name}
            setValue={setPayload}
            keyPayload={'name'}
          />
          {payload.id ? (
            <div className='update-transmission'>
              <Button fullWidth
                text={'UPDATE'}
                value={payload.id}
                onClick={handleSubmitUpdate}
              />
              <span onClick={() => setPayload({ ...payload, id: '', url: '', name: '', idPermission: '' })}
                className='icons-clear center'>
                <TiDeleteOutline />
              </span>
            </div>
          ) : (
            <Button class='col-span-2' text={'CREATE'} onClick={handleSubmitCreate}/>
          )}
        </div>
      ))}
      <div className='list-allocation list-table'>
        <table className='w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>TRANSFER</th>
              <th>NAME</th>
              {functions?.length > 0 && functions.map(item => item.name === 'Delete' && item.idPermission === 1 && (
                <th className='w-[5%]'></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shouldReload && filteredAllocations.length > 0 && filteredAllocations.map((item) => renderTableRow(item))}
            {!shouldReload && Array.isArray(allallocations) && allallocations?.length > 0 && allallocations.map((item) => renderTableRow(item))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Allocations