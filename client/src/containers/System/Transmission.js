import icons from '../../utils/icons'
import { Button } from '../../components'
import * as actions from '../../store/actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { TiDeleteOutline, MdOutlineDeleteSweep } = icons;
const styletd = 'text-center py-2 '

const Transmission = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector(state => state.user)
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { functions } = useSelector(state => state.function)
  const { transfers } = useSelector(state => state.transfer)
  const { permissions } = useSelector(state => state.permission)
  const { alltransmissions } = useSelector(state => state.transmission)
  const permis = currentData.idPermission

  const [payload, setPayload] = useState({
    id: '' || null, idTransfer: '', idPermission: ''
  })
  const handleSubmitCreate = async () => {
    dispatch(actions.createTransmissions(payload))
    setPayload({ id: '', name: '' })
    setShouldRefetch(true)
  }
  const handleSubmitUpdate = async () => {
    dispatch(actions.updateTransmissions(payload))
    setPayload({ id: '', name: '' })
    setShouldRefetch(true)
  }
  const handleSubmitDelete = async () => {
    dispatch(actions.deleteTransmissions(payload))
    setShouldRefetch(true);
  }
  useEffect(() => {
    let searchParamsObject = {}
    if (permis) searchParamsObject.permis = permis
    if (shouldRefetch) {
      dispatch(actions.getPermissions())
      dispatch(actions.getTransfers())
      dispatch(actions.getAllsTransmissions())
      dispatch(actions.getFunctions(searchParamsObject))
      setShouldRefetch(false)
    } else {
      dispatch(actions.getPermissions())
      dispatch(actions.getTransfers())
      dispatch(actions.getAllsTransmissions())
      dispatch(actions.getFunctions(searchParamsObject))
    }
  }, [dispatch, permis, shouldRefetch])

  return (
    <div className='transmission'>
      {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
        <div className='form-transmission'>
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
          <div>
            <label className='text-xs mt-4'>PERMISSION</label>
            <select value={payload.idPermission}
              onChange={(e) => setPayload({ ...payload, idPermission: e.target.value })}
              className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
              <option value="">Select PERMISSION</option>
              {permissions?.length > 0 && permissions.map(items => (
                <option value={items.id}>{items.id} - {items.name}</option>
              ))}
            </select>
          </div>
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
      <div className='list-transmission list-table'>
        <table className='w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TRANSFER</th>
              <th>PERMISSION</th>
              {functions?.length > 0 && functions.map(item => item.name === 'Delete' && item.idPermission === 1 && (
                <th className='w-[5%]'></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alltransmissions?.length > 0 && alltransmissions.map(item => {
              const handleClickRow = () => {
                setPayload({ ...payload, id: item.id, idTransfer: item.idTransfer, idPermission: item.idPermission });
              };
              return (
                <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                  <td className={styletd}>{item.id}</td>
                  <td className={styletd}>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className='py-2'>{item.idTransfer} - {item?.transmission_transfer.name}</td>
                  <td className={styletd}>{item.idPermission}</td>
                  {functions?.length > 0 && functions.map(items => items.name === 'Delete' && items.idPermission === 1 && (
                    <th className='w-[5%]'>
                      <Button IcAfter={MdOutlineDeleteSweep} value={item.id} onClick={handleSubmitDelete}/>
                    </th>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transmission