import * as actions from '../../store/actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, InputForm } from '../../components/index'

const Processing = () => {
  const dispatch = useDispatch()
  const uniqueSizeIds = new Set()
  const [invalidFields, setInvalidFields] = useState([])
  const { accounts } = useSelector(state => state.account)
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { invoicesall } = useSelector(state => state.invoice)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null)
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)
  
  const [payload, setPayload] = useState({
    id: '', idAccept: idcurrent, idShip: '' || 0, idState: '' || 6
  })

  const handleSubmitApprove = async () => {
    setPayload(prevPayload => ({ ...prevPayload, idAccept: idcurrent, idState: 4 }));
    dispatch(actions.updateInvoices(payload))
    setShouldRefetch(true);
  }

  const handleSubmitNo = async () => {
    setPayload(prevPayload => ({ ...prevPayload, idAccept: idcurrent}));
    dispatch(actions.updateInvoices(payload))
    setShouldRefetch(true);
  }

  const handleSubmitComplete = async (id) => {
    const payloads = ({ id: id, idState: 5 })
    dispatch(actions.completeInvoices(payloads))
    setShouldRefetch(true);
  }

  useEffect(() => {
    if (shouldRefetch) {
      dispatch(actions.getAccounts())
      dispatch(actions.getInvoices())
      setShouldRefetch(false);
    } else {
      dispatch(actions.getAccounts())
      dispatch(actions.getInvoices())
    }
  }, [dispatch, shouldRefetch])

  return (
    <div className='processing'>
      {currentData.idPermission !== 3 ? (
        <>
          <div className='processing_approve'>
            <div className='processing_approve-table'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>ACCOUNT</th>
                    <th>TOTAL</th>
                    <th>REFUSE</th>
                  </tr>
                </thead>
                <tbody>
                  {invoicesall?.length > 0 && invoicesall.map(item => {
                    if (item?.detail_invoice?.idState === 3 && !uniqueSizeIds.has(item?.detail_invoice?.id)) {
                      uniqueSizeIds.add(item?.detail_invoice?.id);
                      const createdAtDate = new Date(item?.detail_invoice?.createdAt).toLocaleDateString();
                      return (
                        <tr className='cursor-pointer' onClick={() => { setSelectedInvoiceId(item?.detail_invoice?.id); setPayload({ ...payload, id: item?.detail_invoice?.id }) }}>
                          <td className='text-center'>{item?.detail_invoice?.id}</td>
                          <td className='text-center'>{createdAtDate}</td>
                          <td className='text-center'>{item?.detail_invoice?.idAccount}</td>
                          <td className='text-center'>{(item?.detail_invoice?.total).toLocaleString()}</td>
                          <th>
                            <Button
                              text={'No'}
                              fullWidth
                              onClick={handleSubmitNo}
                            />
                          </th>
                        </tr>
                      )
                    } return null
                  })}
                </tbody>
              </table>
            </div>
            <div className='processing_approve-detail-input'>
              <div className='processing_approve-detail'>
                <table className='w-full'>
                  <thead>
                    <tr>
                      <th className=''>IDSP</th>
                      <th className=''>NAME</th>
                      <th>SIZE</th>
                      <th>COLOR</th>
                      <th className=''>QUANTITY</th>
                      <th className=''>PRICE</th>
                      <th className=''>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoiceId && invoicesall?.length > 0 && invoicesall.map(item => {
                      if (item.idInvoice === selectedInvoiceId)
                        return (
                          <tr>
                            <td className='text-center'>{item.idProduct}</td>
                            <td className='pl-1'>{item.name}</td>
                            <td className='pl-1'>{item.idSize}</td>
                            <td className='pl-1'>{item.idColor}</td>
                            <td className='text-center'>{item.quantity}</td>
                            <td className='text-center'>{(item.price).toLocaleString()}</td>
                            <td className='text-center text-red-500'>{(item.quantity * item.price).toLocaleString()}</td>
                          </tr>
                        )
                      return null
                    })}
                  </tbody>
                </table>
              </div>
              <div className='processing_approve-input'>
                <InputForm
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  label={'ID INVOICE'}
                  value={payload.id}
                  setValue={setPayload}
                  keyPayload={'id'}
                  type='number'
                  disabled
                />
                <div>
                  <label className='text-xs mt-4'>SHIPPER</label>
                  <select value={payload.idShip}
                    onChange={(e) => setPayload({ ...payload, idShip: e.target.value })}
                    className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 w-full cursor-pointer'>
                    <option value="">Select SHIPPER</option>
                    {accounts?.length > 0 && accounts.map(item => item.idPermission === 3 && (
                      <option value={item.id}>{item.id} - {item.name}</option>
                    ))}
                  </select>
                </div>
                <Button
                  fullWidth
                  text={'Approve'}
                  onClick={handleSubmitApprove}
                />
              </div>
            </div>
          </div>
          <div className='processing_ship'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>ACCOUNT</th>
                  <th>SHIP</th>
                  <th>TOTAL</th>
                  <th>ACCEPT</th>
                  <th>SHIPPER</th>
                  <th>STATE</th>
                </tr>
              </thead>
              <tbody>
                {invoicesall?.length > 0 && invoicesall.map(item => {
                  if (item?.detail_invoice?.idState === 4 && !uniqueSizeIds.has(item?.detail_invoice?.id)) {
                    uniqueSizeIds.add(item?.detail_invoice?.id);
                    const createdAtDate = new Date(item?.detail_invoice?.createdAt).toLocaleDateString();
                    return (
                      <tr className='cursor-pointer' onClick={() => setSelectedInvoiceId(item?.detail_invoice?.id)}>
                        <td className='text-center'>{item?.detail_invoice?.id}</td>
                        <td className='text-center'>{createdAtDate}</td>
                        <td className='text-center'>{item?.detail_invoice?.idAccount}</td>
                        <td className='text-center'>{item?.detail_invoice?.ship}</td>
                        <td className='text-center'>{(item?.detail_invoice?.total).toLocaleString()}</td>
                        <td className='text-center'>{item?.detail_invoice?.idAccept}</td>
                        <td className='text-center'>{item?.detail_invoice?.idShip}</td>
                        <td className='text-center'>{item?.detail_invoice?.idState}</td>
                      </tr>
                    )
                  } return null
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className='processing_ship'>
          <table className='w-full'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>ACCOUNT</th>
                <th>SHIP</th>
                <th>TOTAL</th>
                <th>ACCEPT</th>
                <th>SHIPPER</th>
                <th>STATE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoicesall?.length > 0 && invoicesall.map(item => {
                if (item?.detail_invoice?.idState === 4 && item?.detail_invoice?.idShip === idcurrent && !uniqueSizeIds.has(item?.detail_invoice?.id)) {
                  uniqueSizeIds.add(item?.detail_invoice?.id);
                  const createdAtDate = new Date(item?.detail_invoice?.createdAt).toLocaleDateString();
                  return (
                    <tr className='cursor-pointer' onClick={() => setSelectedInvoiceId(item?.detail_invoice?.id)}>
                      <td className='text-center'>{item?.detail_invoice?.id}</td>
                      <td className='text-center'>{createdAtDate}</td>
                      <td className='text-center'>{item?.detail_invoice?.idAccount}</td>
                      <td className='text-center'>{item?.detail_invoice?.ship}</td>
                      <td className='text-center'>{(item?.detail_invoice?.total).toLocaleString()}</td>
                      <td className='text-center'>{item?.detail_invoice?.idAccept}</td>
                      <td className='text-center'>{item?.detail_invoice?.idShip}</td>
                      <td className='text-center'>{item?.detail_invoice?.idState}</td>
                      <th>
                        <Button
                          text={'Complete'}
                          fullWidth
                          onClick={() => handleSubmitComplete(item?.detail_invoice?.id)}
                        />
                      </th>
                    </tr>
                  )
                } return null
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Processing