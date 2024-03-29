import icons from '../../utils/icons'
import React, { useEffect, useState } from 'react'
import * as actions from '../../store/actions'
import { Frame, RevenueChart } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'

const { MdSwitchAccount, RiMoneyPoundCircleFill, FaClipboardList, FaFileInvoiceDollar } = icons

const Dashboard = () => {
  const dispatch = useDispatch()
  const { images } = useSelector(state => state.image)
  const { counta } = useSelector(state => state.account)
  const { countp } = useSelector(state => state.product)
  const [shouldReload, setShouldReload] = useState(false)
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { invoices, sellers, selleracs } = useSelector(state => state.invoice)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  console.log(selleracs)
  const handleSearch = (event) => {
    setSelectedDate(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredInvoice = [];
  if (invoices && Array.isArray(invoices)) {
    filteredInvoice = invoices.filter((item) =>
      item.createdAt.includes(selectedDate)
    );
  }

  let filteredSeller = [];
  if (sellers && Array.isArray(sellers)) {
    filteredSeller = sellers.filter(item =>
      item.createdAt.includes(selectedDate)
    );
  }

  useEffect(() => {
    if (shouldRefetch) {
      dispatch(actions.getImages())
      dispatch(actions.getProducts())
      dispatch(actions.getInvoices())
      dispatch(actions.getCountAccounts())
      dispatch(actions.getSellerAccounts())
      dispatch(actions.getSellerProducts())
      setShouldRefetch(false);
    } else {
      dispatch(actions.getImages())
      dispatch(actions.getProducts())
      dispatch(actions.getInvoices())
      dispatch(actions.getCountAccounts())
      dispatch(actions.getSellerAccounts())
      dispatch(actions.getSellerProducts())
    }
  }, [dispatch, shouldRefetch])

  return (
    <div className='dashboard'>
      <div className='chart-number'>
        <div className='number'>
          {invoices?.length > 0 && (
            <Frame icon={<RiMoneyPoundCircleFill />} title="Revenue"
              total={invoices
                .filter((item) => item?.idState === 5)
                .reduce((acc, item) => acc + item?.total, 0)}
               color='#008000'
            />
          )}
          <Frame icon={<MdSwitchAccount />} title="Account"
            total={counta} color='#FFA500'
          />
          <Frame icon={<FaClipboardList />} title="Product"
            total={countp} color='#0000FF'
          />
          {invoices?.length > 0 && (
            <Frame icon={<FaFileInvoiceDollar />} title="Invoice"
              total={invoices.filter(item => item?.idState === 5).length}
              color='#000'
            />
          )}
        </div>
        <div className='chart'><RevenueChart /></div>
      </div>
      <div className='seller-account'>
        {/* <div className='seller-account_header '>
          <span className='title center'>SELLER</span>
          <input type='date' className='input bg-[#e7e7e7]' value={selectedDate} onChange={handleSearch} /> 
        </div> */}
        <div className='seller-account_table'>
          <div className='seller_table'>
            <table className='w-full'>
              <tr className='border-b'>
                <th>ID</th>
                <th className='image w-[10%]'>IMAGE</th>
                <th>NAME</th>
                <th>COLOR</th>
                <th>SOLD</th>
              </tr>
              {sellers?.length > 0 && sellers.map(item => (
                <tr>
                  <td className='text-center'>{item.idProduct}</td>
                  <td className='image w-[10%]'>
                    {images?.length > 0 && images.map(items => items.idProduct === item.idProduct && items.idColor === item.idColor && (
                      <img src={`/images/${items.image1}`} alt={item?.product_invoicedetail.name}
                        className='h-[70%] object-cover' />
                    ))}
                  </td>
                  <td>{item?.product_invoicedetail.name}</td>
                  <td className='text-center'>{item.idColor}</td>
                  <td className='text-center'>{item.totalSold}</td>
                </tr>
              ))}
            </table>
          </div>
          <div className='account_table'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th rowSpan={2}>ID</th>
                  <th rowSpan={2}>NAME</th>
                  <th colSpan={2}>Number of</th>
                </tr>
                <tr className='border-b'>
                  <th>ORDER</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody className='bg-[#e7e7e7'>

                {selleracs?.length > 0 && selleracs.map((item) => (
                  <tr key={item.id}>
                    <td className='text-center'>{item.idAccount}</td>
                    <td>{item?.invoice_account.name}</td>
                    <td className='text-center'>{(item.totalInvoices).toLocaleString()}</td>
                    <td className='text-center'>{(item.totalAmount).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard