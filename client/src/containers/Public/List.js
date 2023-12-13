import React, { useEffect } from 'react'
import * as actions from '../../store/actions'
import { Item } from '../../components/index'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const List = ({category}) => {
  // console.log(category)
  const dispatch = useDispatch();
  const [searchParmas] = useSearchParams();
  const { products_limit } = useSelector(state => state.product)
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)

  useEffect(() => {
    dispatch(actions.getProducts())
  })
  useEffect(() => {
    let params = [];
    for (let entry of searchParmas.entries()) params.push(entry);
    let searchParamsObject = {}
    params?.forEach(i => {
      if (Object.keys(searchParamsObject)?.some(item => item === i[0])) 
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
      else 
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
    })
    if (category) searchParamsObject.category = category
    dispatch(actions.getProductsLimit(searchParamsObject));
  }, [searchParmas, category, dispatch]);

  return (
    <div className='lists'>
      {products_limit?.length > 0 && products_limit.map(item => item.idState === 2 && (
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