import Swal from 'sweetalert2'
import * as actions from '../../store/actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Order = () => {
  const dispatch = useDispatch()
  const { colors } = useSelector(state => state.color)
  const { images } = useSelector(state => state.image)
  const { currentData } = useSelector(state => state.user)
  const { msg, update } = useSelector(state => state.account)
  const { invoicesall } = useSelector(state => state.invoice)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null)
  const { dimensions } = useSelector(state => state.dimension)
  const idcurrent = parseInt(currentData.id)

  useEffect(() => {
    msg && Swal.fire('Oops !', msg, 'error');
  }, [msg, update]);

  useEffect(() => {
    dispatch(actions.getColors())
    dispatch(actions.getImages())
    dispatch(actions.getInvoices())
    dispatch(actions.getDimensions())
  }, [dispatch])

  return (
    <div className='order'>
      <table className='w-full'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TRANSFER</th>
            <th>TOTAL</th>
            <th>SHIPPER</th>
            <th>STATE</th>
          </tr>
        </thead>
        <tbody>
          {invoicesall?.length > 0 && invoicesall
            .filter(item => item?.detail_invoice.idAccount === idcurrent) // Filter out the unwanted items
            .reduce((acc, item) => {
              const invoiceDetail = item?.detail_invoice;
              if (!invoiceDetail) return acc;
              const createdAtDate = new Date(invoiceDetail?.createdAt).toLocaleDateString();
              const stateColor = invoiceDetail?.idState === 5 ? 'text-green-800' : invoiceDetail?.idState === 4 ? 'text-blue-600' : invoiceDetail?.idState === 6 ? 'text-red' : 'text-black';

              if (!acc.some(accItem => accItem?.invoiceDetailId === invoiceDetail?.id))
                acc.push({
                  invoiceDetailId: invoiceDetail?.id,
                  jsx: (
                    <>
                      <tr className='cursor-pointer' onClick={() => { setSelectedInvoiceId(invoiceDetail?.id)}}>
                        <td className='text-center'>{invoiceDetail?.id}</td>
                        <td className='text-center'>{createdAtDate}</td>
                        <td className='text-center'>{(invoiceDetail?.ship).toLocaleString()}</td>
                        <td className='text-center'>{(invoiceDetail?.total).toLocaleString()}</td>
                        <td className='text-center'>{invoiceDetail.idShip}</td>
                        <td className={`text-center ${stateColor}`}>{invoiceDetail?.invoice_state?.name}</td>
                      </tr>
                      {selectedInvoiceId && item.idInvoice === selectedInvoiceId && (
                        <tr className='bg-[#ddd]'>
                          <td colSpan={6}>
                            <table className='w-full'>
                              <tr>
                                <th className='w-[10%]'>Image</th>
                                <th>Name</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Amount</th>
                              </tr>
                              {invoicesall?.length > 0 && invoicesall.map(itemss => itemss.idInvoice === selectedInvoiceId && (
                                <tr>
                                  <td className='w-[10%] text-center'>
                                    {images?.length > 0 && images.map(items => items.idProduct === itemss.idProduct && items.idColor === itemss.idColor && (
                                      <img src={`/images/${items.image1}`} alt={item?.product_invoicedetail?.name}
                                        className='h-[70%] object-cover' />
                                    ))}
                                  </td>
                                  <td>{itemss?.product_invoicedetail?.name}</td>
                                  <td className='text-center'>
                                    {colors?.length > 0 && colors.map(items => items.id === itemss.idColor && (
                                      <div
                                        className={'box_color'}
                                        style={{ backgroundColor: items.code, alignSelf: 'center' }}
                                      ></div>
                                    ))}
                                  </td>
                                  <td className='text-center'>
                                    {dimensions?.length > 0 && dimensions.map(items => items.id === itemss.idSize && (
                                      <>{items.code}</>
                                    ))}
                                  </td>
                                  <td className='text-center'>{itemss.quantity}</td>
                                  <td className='text-center'>{(itemss.price).toLocaleString()}</td>
                                  <td className='text-center'>{itemss.discount}</td>
                                  <td className='text-center'>{itemss.amount}</td>
                                </tr>
                              ))}
                            </table>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                });
              return acc;
            }, [])
            .map(item => item.jsx)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Order