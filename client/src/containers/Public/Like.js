import React, { useEffect } from 'react'
import { Item } from '../../components/index'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const Like = () => {
  const dispatch = useDispatch()
  const { likes } = useSelector(state => state.app)
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)

  useEffect(() => {
    dispatch(actions.getLikes())
  })
  return (
    <div className='like'>
      {likes?.length > 0 && likes.map(item => {
        if (item.idAccount === idcurrent)
          return (
            <Item
              key={item?.like_product?.id}
              id={item?.like_product?.id}
              name={item?.like_product?.name}
              discount={item?.like_product?.discount}
              price={item?.like_product?.price}
              idCategory={item?.like_product?.idCategory}
              nameCategory={item?.like_product?.product_category?.name}
              idCurrent={idcurrent}
            />
          )
        return null
      })}
    </div>
  )
}

export default Like