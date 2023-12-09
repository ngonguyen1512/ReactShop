import React, { useEffect } from 'react'
import * as actions from '../../store/actions'
import { Item } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'

const List = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product)
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)

  useEffect(() => {
    dispatch(actions.getProducts())
  })

  return (
    <div className='list'>
      {products?.length > 0 && products.map(item => item.idState === 2 && (
        <Item 
          id={item?.id}
          name={item?.name}
          price={item?.price}
          idCurrent={idcurrent}
          discount={item?.discount}
          idCategory={item?.idCategory}
          nameCategory={item?.product_category?.name}
        />
      ))}
    </div>
  )
}

export default List