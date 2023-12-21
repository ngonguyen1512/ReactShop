import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { List, Pagination } from './index'
import { Filter } from '../../components/index'

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { count, products_limit } = useSelector(state => state.product)

  return (
    <div className='homepage center'>
      <Filter title='Sort price' isDouble={true} />
      <div className='list-pagination'>
        <List />
        {Math.ceil(count / 12) > 1 && (<Pagination count={count} currentPage={currentPage}
          setCurrentPage={setCurrentPage} counts={products_limit} />
        )}
      </div>
    </div>
  )
}

export default HomePage