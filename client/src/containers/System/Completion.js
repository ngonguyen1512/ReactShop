import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const Completion = () => {
  const dispatch = useDispatch()
  const uniqueSizeIds = new Set()
  const [selectedDate, setSelectedDate] = useState('')
  const { colors } = useSelector(state => state.color)
  const { dimensions } = useSelector(state => state.dimension)
  const { invoicesall } = useSelector(state => state.invoice)
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)
  const [shouldReload, setShouldReload] = useState(false)
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const handleSearch = (event) => {
    setSelectedDate(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredInvoices = [];

  if (invoicesall && Array.isArray(invoicesall)) {
    filteredInvoices = invoicesall.filter((item) =>
      item.createdAt.includes(selectedDate) 
    );
  }

  useEffect(() => {
    if (shouldRefetch) {
      dispatch(actions.getColors())
      dispatch(actions.getInvoices())
      dispatch(actions.getDimensions())
      setShouldRefetch(false);
    } else {
      dispatch(actions.getColors())
      dispatch(actions.getInvoices())
      dispatch(actions.getDimensions())
    }
  }, [dispatch, shouldRefetch])

  const mapInvoiceDetails = (items) => {
    return items.map(item => {
      if (!uniqueSizeIds.has(item?.detail_invoice?.id)) {
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
      }
      return null
    })
  }

  return (
    <div className='completion'>
      <div className='completion_header end'>
        <input type='date' className='input bg-[#e7e7e7]' value={selectedDate} onChange={handleSearch} />
      </div>
      <div className='completion_table'>
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
            {shouldReload && filteredInvoices.length > 0 && mapInvoiceDetails(filteredInvoices)}
            {!shouldReload && invoicesall?.length > 0 && mapInvoiceDetails(invoicesall)}
          </tbody>
        </table>
      </div>
      <div className='completion_detail'>
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
                    <td className='pl-1'>{item?.product_invoicedetail?.name}</td>
                    <td className='text-center'>
                      {dimensions?.length > 0 && dimensions.map(items => items.id === item.idSize && (
                        <>{items.code}</>
                      ))}
                    </td>
                    <td className='text-center center'>
                      {colors?.length > 0 && colors.map(items => items.id === item.idColor && (
                        <div
                          className={'box_color'}
                          style={{ backgroundColor: items.code, alignSelf: 'center' }}
                        ></div>
                      ))}
                    </td>
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
    </div>
  )
}

export default Completion