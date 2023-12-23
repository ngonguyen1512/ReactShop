import React, { useEffect } from 'react'
import { Item } from '../../components/index'
import * as actions from '../../store/actions'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const List = ({ category }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]
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
      {parts !== '' && products_limit?.length > 0 && products_limit.map(item => item.idState === 2 && (
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
      {parts === '' && products_limit?.length > 0 &&
        products_limit
          .filter(item => item.idState === 2)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(item => (
            <Item
              key={item?.id}
              id={item?.id}
              name={item?.name}
              price={item?.price}
              idCurrent={idcurrent}
              discount={item?.discount}
              idCategory={item?.idCategory}
              nameCategory={item?.product_category?.name}
            />
          ))
      }
    </div>
  )
}

export default List