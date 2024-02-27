import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { List, Pagination } from './index'
import { path } from '../../utils/constant'
import * as actions from '../../store/actions'
import { Filter, Button } from '../../components/index'
import { NavLink, useLocation } from 'react-router-dom'
import { Item } from '../../components/index'

const HomePage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]
  const [currentPage, setCurrentPage] = useState(1)
  const { count, products_limit, products_promotion } = useSelector(state => state.product)
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)
  useEffect(() => {
    dispatch(actions.getProductsPromotion())
  })
  return (
    <div className='homepage center'>
      {parts !== '' && <Filter title='Sort price' isDouble={true} />}
      {parts === '' &&
        <>
          <p className='title'>PROMOTIONS</p>
          <div className='promotion'>
            {products_promotion?.length > 0 && products_promotion.map(item => item.idState === 2 && (
              <Item id={item?.id}
                name={item?.name}
                price={item?.price}
                idCurrent={idcurrent}
                discount={item?.discount}
                idCategory={item?.idCategory}
                nameCategory={item?.product_category?.name}
              />
            ))}
          </div>
          <p className='title mt-[4%]'>ALL PRODUCTS</p>
        </>
      }
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