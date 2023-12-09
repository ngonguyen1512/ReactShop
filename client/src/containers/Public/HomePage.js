import React from 'react'
import { Filter } from '../../components/index'
import { List, Pagination } from './index'

const HomePage = () => {
  return (
    <div className='homepage center'>
      <Filter />
      <div className='list-pagination'>
        <List />
        {/* {Math.ceil(countp / 12) > 1 && (<Pagination count={countp} currentPage={currentPage}
            setCurrentPage={setCurrentPage} counts={products} />
          )} */}
        <Pagination />
      </div>
    </div>
  )
}

export default HomePage