import { useSelector } from 'react-redux'
import { List, Pagination } from './index'
import { useLocation } from 'react-router-dom'
import { Filter } from '../../components/index'
import React, { useEffect, useState } from 'react'

const Retal = () => {
  const location = useLocation()
  const path = location.pathname
  const parts = path.split('/')
  const lastPart = parts[parts.length - 1]
  const [currentPage, setCurrentPage] = useState(1)
  const [idCategory, setIdCategory] = useState('none')
  const { categories } = useSelector(state => state.category)
  const { count, products_limit } = useSelector(state => state.product)

  useEffect(() => {
    const category = categories?.find(item => `/${item.name}` === location.pathname)
    if (category) setIdCategory(category.id)
  }, [location, categories]);

  return (
    <div className='retal center'>
      <div className='retal-header' >
        <p className='retal-header_title center'>{lastPart}</p>
        <Filter content={categories} type='sample' list={lastPart} texts={lastPart} />
      </div>
      <div className='retal-main'>
        <List category={idCategory} />
        {Math.ceil(count / 12) > 1 && (<Pagination count={count} currentPage={currentPage}
          setCurrentPage={setCurrentPage} counts={products_limit} />
        )}
      </div>
    </div>
  )
}

export default Retal