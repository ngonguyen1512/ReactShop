import React, { useEffect } from 'react'
import * as actions from '../../store/actions'
import { Processing, Completion } from './index'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'

const Invoice = () => {
  const idTransfer = 5
  const location = useLocation()
  const dispatch = useDispatch()
  const pathurl = location.pathname
  const parts = pathurl.split('/')
  const last = parts[parts.length - 1];
  const { allocations } = useSelector(state => state.allocation)

  useEffect(() => {
    let searchParamsObject = {}
    if (idTransfer) searchParamsObject.idTransfer = idTransfer
    dispatch(actions.getAllocations(searchParamsObject))
  }, [dispatch]);

  return (
    <div className='invoice'>
      <div className='header-invoice'>
        {allocations?.length > 0 && allocations.map(item => (
          <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className='content'>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <div className='main-invoice'>
        {last === 'processing' ? (
          <Processing />
        ) : (
          <Completion />
        )}
      </div>
    </div>
  )
}

export default Invoice