import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputForm, Button, Item } from "../../components";
import * as actions from '../../store/actions'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';

const Order = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentData } = useSelector(state => state.user)
  const { msg, update } = useSelector(state => state.account)
  const { invoicesall } = useSelector(state => state.invoice)
  const idcurrent = parseInt(currentData.id)
  const [invalidFields, setInvalidFields] = useState([])
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(true);

  const [payload, setPayload] = useState({
    id: idcurrent, name: '', email: '',
    phone: '', passwordold: '', passwordnew: '',
  });
  const handleOrderClick = () => {
    setShowInvoiceDetails(true);
  };
  const handleLikeClick = () => {
    setShowInvoiceDetails(false);
  };

  useEffect(() => {
    msg && Swal.fire('Oops !', msg, 'error');
  }, [msg, update]);

  useEffect(() => {
    dispatch(actions.getInvoices())
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
                    <tr className='cursor-pointer' onClick={() => setSelectedInvoiceId(invoiceDetail?.id)}>
                      <td className='text-center'>{invoiceDetail?.id}</td>
                      <td className='text-center'>{createdAtDate}</td>
                      <td className='text-center'>{(invoiceDetail?.ship).toLocaleString()}</td>
                      <td className='text-center'>{(invoiceDetail?.total).toLocaleString()}</td>
                      <td className='text-center'>{invoiceDetail.idShip}</td>
                      <td className={`text-center ${stateColor}`}>{invoiceDetail?.invoice_state?.name}</td>
                    </tr>
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