import icons from '../../utils/icons'
import React, { useEffect, useState } from 'react'
import * as actions from '../../store/actions'
import { Frame, RevenueChart } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { IoTerminalOutline } from 'react-icons/io5'

const { MdSwitchAccount, RiMoneyPoundCircleFill, FaClipboardList, FaFileInvoiceDollar } = icons

const Dashboard = () => {
  const dispatch = useDispatch()
  const [selectedDate, setSelectedDate] = useState('')
  const { images } = useSelector(state => state.image)
  const { counta } = useSelector(state => state.account)
  const { countp } = useSelector(state => state.product)
  const [shouldReload, setShouldReload] = useState(false)
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { invoices, sellers } = useSelector(state => state.invoice)

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
      dispatch(actions.getAccounts())
      dispatch(actions.getInvoices())
      dispatch(actions.getTopSelling())
      setShouldRefetch(false);
    } else {
      dispatch(actions.getImages())
      dispatch(actions.getProducts())
      dispatch(actions.getAccounts())
      dispatch(actions.getInvoices())
      dispatch(actions.getTopSelling())
    }
  }, [dispatch, shouldRefetch])

  const renderProductSellerRow = (item) => {
    return (
      <tr>
        <td>{item.idProduct}</td>
        <td className='image w-[10%]'>
          {images?.length > 0 && images.map(items => items.idProduct === item.idProduct && items.idColor === item.idColor && (
            <img src={`/images/${items.image1}`} alt={item?.product_invoicedetail.name}
              className='h-[70%] object-cover' />
          ))}
        </td>
        <td>{item?.product_invoicedetail.name}</td>
        <td>{item.idSize}</td>
        <td>{item.idColor}</td>
        <td>{item.totalSold}</td>
      </tr>
    )
  };

  return (
    <div className='dashboard'>
      <div className='chart-number'>
        <div className='number'>
          {invoices?.length > 0 && (
            <Frame
              icon={<RiMoneyPoundCircleFill />} title="Revenue"
              total={invoices
                .filter((item) => item?.idState === 5)
                .reduce((acc, item) => acc + item?.total, 0)}
              background='#008000' color='#008000'
            />
          )}
          <Frame
            icon={<MdSwitchAccount />} title="Account"
            total={counta} background='#FFA500' color='#FFA500'
          />
          <Frame
            icon={<FaClipboardList />} title="Product"
            total={countp} background='#0000FF' color='#0000FF'
          />
          {invoices?.length > 0 && (
            <Frame
              icon={<FaFileInvoiceDollar />} title="Invoice"
              total={invoices
                .filter((item) => item?.idState === 5).length}
              background='#000' color='#000'
            />
          )}
        </div>
        <div className='chart'>
          <RevenueChart />
        </div>
      </div>
      <div className='seller-account'>
        <div className='seller-account_header between'>
          <span className='title'>BEST SELLER</span>
          <input type='date' className='input bg-[#e7e7e7]' value={selectedDate} onChange={handleSearch} />
        </div>
        <div className='seller-account_table'>
          <div className='seller_table'>
            <table className='w-full'>
              <tr className='border-b'>
                <th>ID</th>
                <th className='image w-[10%]'>IMAGE</th>
                <th>NAME</th>
                <th>SIZE</th>
                <th>COLOR</th>
                <th>SOLD</th>
              </tr>
              {/* {sellers?.length > 0 && sellers.map(item => (
                <tr>
                  <td>{item.idProduct}</td>
                  <td className='image w-[10%]'>
                    {images?.length > 0 && images.map(items => items.idProduct === item.idProduct && items.idColor === item.idColor && (
                      <img src={`/images/${items.image1}`} alt={item?.product_invoicedetail.name}
                        className='h-[70%] object-cover' />
                    ))}
                  </td>
                  <td>{item?.product_invoicedetail.name}</td>
                  <td>{item.idSize}</td>
                  <td>{item.idColor}</td>
                  <td>{item.totalSold}</td>
                </tr>
              ))} */}
              {shouldReload && filteredSeller.length > 0 && filteredSeller.map((item) => renderProductSellerRow(item))}
              {!shouldReload && sellers?.length > 0 && sellers.map((item) => renderProductSellerRow(item))}
            </table>
          </div>
          <div className='account_table'>
            <table className='w-full'>
              <tr className='border-b'>
                <th>ID</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>INVOICES</th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard