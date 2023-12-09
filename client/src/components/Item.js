import icons from '../utils/icons'
import React, { useEffect } from 'react'
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { IntlProvider, FormattedNumber } from 'react-intl'

const { IoHeartSharp, IoHeartOutline } = icons

const Item = ({ id, name, discount, price, idCurrent, nameCategory }) => {
  let displayedImage = false;
  const dispatch = useDispatch();
  const { images } = useSelector(state => state.image)

  useEffect(() => {
    dispatch(actions.getImages())
  }, [dispatch])
  return (
    <div className='item'>
      <div className='like-unlike'>
        <IoHeartOutline />
      </div>
      <NavLink>
        <div className='image center'>
          {images?.length > 0 && images.map(item => {
            if (item.idProduct === id && !displayedImage) {
              displayedImage = true;
              return (
                <img src={`/images/${item.image1}`} alt={name} className='h-[80%] object-cover' />
              )
            } return null;
          })}
        </div>
        <div className='product_content'>
          <span className='center'>{name}</span>
          {discount === 0 ? (
            <div className='tag center'>
              <div className='price'>
                <IntlProvider locale="vi">
                  <FormattedNumber
                    value={price}
                    currency="VND"
                    minimumFractionDigits={0}
                  />đ
                </IntlProvider>
              </div>
            </div>
          ) : (
            <div className='tag center'>
              <div className='price'>
                <IntlProvider locale="vi">
                  <FormattedNumber
                    value={price}
                    currency="VND"
                    minimumFractionDigits={0}
                  />đ
                </IntlProvider>
              </div>
              <div className='basic_price-discount'>
                <div className='price'>
                  <IntlProvider locale="vi">
                    <FormattedNumber
                      value={price}
                      currency="VND"
                      minimumFractionDigits={0}
                    /> đ
                  </IntlProvider>
                </div>
                <span className='discount'>-{discount}%</span>
              </div>
            </div>
          )}
        </div>
      </NavLink >
    </div >
  )
}

export default Item