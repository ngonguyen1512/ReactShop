import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const Completion = () => {
  const dispatch = useDispatch()
  const uniqueSizeIds = new Set()
  const { states } = useSelector(state => state.state)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const { colors } = useSelector(state => state.color)
  const { dimensions } = useSelector(state => state.dimension)
  const { invoicesall } = useSelector(state => state.invoice)
  const [shouldReload, setShouldReload] = useState(false)
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const handleSearch = (event) => {
    setSelectedDate(event.target.value)
    setShouldReload(event.target.value !== "");
  };
  const handleSearchState = (event) => {
    selectedState(event.target.value)
    setShouldReload(event.target.value !== "");
  };

  let filteredInvoices = [];

  if (invoicesall && Array.isArray(invoicesall)) {
    filteredInvoices = invoicesall.filter((item) => {
      item.createdAt.includes(selectedDate);
    });
  }
  let filteredState = [];
  const searchValueAsNumber = parseInt(selectedState, 10); // Chuyển đổi searchValue thành số nguyên

  if (!isNaN(searchValueAsNumber) && invoicesall && Array.isArray(invoicesall)) {
    filteredState = invoicesall.filter((item) =>
      Number.isInteger(item?.detail_invoice.idState) && item?.detail_invoice.idState === searchValueAsNumber
    );
  }

  useEffect(() => {
    if (shouldRefetch) {
      dispatch(actions.getStates())
      dispatch(actions.getColors())
      dispatch(actions.getInvoices())
      dispatch(actions.getDimensions())
      setShouldRefetch(false);
    } else {
      dispatch(actions.getStates())
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
        <div>
          <label className='text-xs mt-4'>STATE</label>
          <select 
            className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 rounded-md w-full cursor-pointer'>
            <option value="">Select STATE</option>
            {states?.length > 0 && states.map(item => (item.id === 5 || item.id === 6 || item.id === 7) && (
              <option value={item.id} onChange={handleSearchState}>{item.id} - {item.name}</option>
            ))}
          </select>
        </div>
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
            {shouldReload && filteredState.length > 0 && mapInvoiceDetails(filteredState)}
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