import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { List, Pagination } from './index'
import { path } from '../../utils/constant'
import { Filter, Button } from '../../components/index'
import { NavLink, useLocation } from 'react-router-dom'

const HomePage = () => {
  const location = useLocation()
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]
  const [currentPage, setCurrentPage] = useState(1)
  const { count, products_limit } = useSelector(state => state.product)

  return (
    <div className='homepage center'>
      {parts !== '' && <Filter title='Sort price' isDouble={true} />}
      <div className='list-pagination'>
        <List />
        {parts === '' && Math.ceil(count / 12) > 1 && (
          <NavLink className='center mt-[4%]' to={path.HOME__PAGE}>
            <Button text='Load more' />
          </NavLink>
        )}
        {parts !== '' && Math.ceil(count / 12) > 1 && (<Pagination count={count} currentPage={currentPage}
          setCurrentPage={setCurrentPage} counts={products_limit} />
        )}
      </div>
    </div>
  )
}

export default HomePage