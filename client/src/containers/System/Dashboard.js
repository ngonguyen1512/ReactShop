import icons from '../../utils/icons'
import React, { useEffect } from 'react'
import * as actions from '../../store/actions'
import { Frame, RevenueChart } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'

const { MdSwitchAccount, RiMoneyPoundCircleFill } = icons

const Dashboard = () => {
  const dispatch = useDispatch()
  const { counta } = useSelector(state => state.account)
  const { invoices } = useSelector(state => state.invoice)
  console.log(invoices)
  useEffect(() => {
    dispatch(actions.getAccounts())
    dispatch(actions.getInvoices())
  })

  return (
    <div className='dashboard'>
      <div className='chart-number'>
        <div className='number'>
          {invoices?.length > 0 && (
            <Frame
              icon={<RiMoneyPoundCircleFill />}
              title="Revenue"
              total={invoices
                .filter((item) => item?.detail_invoice?.idState === 5)
                .reduce((acc, item) => acc + item?.detail_invoice?.total, 0)}
              background='#008000'
              color='#008000'
            />
          )}
          <Frame icon={<MdSwitchAccount />} title="Account" total={counta} background='#FFA500' color='#FFA500' />
        </div>
        <div className='chart'>
          <RevenueChart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard