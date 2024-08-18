import icons from '../utils/icons'
import { NavLink } from 'react-router-dom'
import * as actions from '../store/actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IntlProvider, FormattedNumber } from 'react-intl'
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString'

const { IoHeartSharp, IoHeartOutline } = icons

const Item = ({ id, name, discount, price, idCurrent, nameCategory }) => {
  let displayedImage = false
  const dispatch = useDispatch()
  const [likess, setLikess] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const { likes } = useSelector(state => state.app)
  const { images } = useSelector(state => state.image)
  const [changedImage, setChangedImage] = useState(null)
  const { isLoggedIn } = useSelector(state => state.auth)
  const { quantities } = useSelector(state => state.quantity)
  const handleMouseEnter = () => { setChangedImage('image2') }
  const handleMouseLeave = () => { setChangedImage('image1') }

  const handleLike = (id) => {
    const updatedPayload = { idAccount: idCurrent, idProduct: id };
    if (!isLiked) {
      dispatch(actions.createLikes(updatedPayload));
      setLikess([...likess, updatedPayload]);
      setIsLiked(true); // Cập nhật trạng thái ngay lập tức
    }
  };
  
  const handleUnLike = (id) => {
    const updatedPayload = { idAccount: idCurrent, idProduct: id };
    dispatch(actions.deleteLikes(updatedPayload));
    const updatedLikes = likess.filter((item) => item.idProduct !== id || item.idAccount !== idCurrent);
    setLikess(updatedLikes);
    setIsLiked(false); // Cập nhật trạng thái ngay lập tức
  };  

  useEffect(() => {
    if (Array.isArray(likes)) {
      const hasLiked = likes.some(
        item => item.idProduct === id && item.idAccount === idCurrent
      );
      setIsLiked(hasLiked);
    }
  }, [likes, id, idCurrent, likess]);

  useEffect(() => {
    dispatch(actions.getLikes())
    dispatch(actions.getImages())
    dispatch(actions.getQuantities())
  }, [dispatch])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };

  return (
    <div className='item' key={id}>
      <NavLink onClick={handleClick} to={`/${formatVietnameseToString(nameCategory)}/${formatVietnameseToString(name)}/${id}`} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className='image center'>
          {images?.length > 0 && images.map(item => {
            if (item.idProduct === id && !displayedImage) {
              displayedImage = true;
              return (
                <div className='relative h-[80%]'>
                  <div className='heart'>
                    {isLoggedIn && (
                      <div className='like-unlike'>
                        {isLiked ? (
                          <span className="icons" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleUnLike(id); }}><IoHeartSharp style={{ color: 'red' }} /></span>
                        ) : (
                          <span className="icons" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleLike(id) }}><IoHeartOutline /></span>
                        )}
                      </div>
                    )}
                  </div>
                  <img key={item.id} alt={name}
                    src={`/images/${item[changedImage || 'image1']}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'duration-300' }}
                  />
                  <div className='color'>
                    {quantities.filter(item => item.idProduct === id).reduce((uniqueColors, item) => {
                      if (!uniqueColors.some(color => color.code === item.quantity_color.code))
                        uniqueColors.push({ code: item.quantity_color.code, sizes: [] });
                      const colorIndex = uniqueColors.findIndex(color => color.code === item.quantity_color.code);
                      uniqueColors[colorIndex].sizes.push(item.size);
                      return uniqueColors;
                    }, [])
                      .map(color => (
                        <span className='w-[30px] h-[10px] ' style={{ backgroundColor: color.code }}></span>
                      )
                    )}
                  </div>
                </div>
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
                    value={price} currency="VND"
                    minimumFractionDigits={0}
                  /><span className='underline'>đ</span>
                </IntlProvider>
              </div>
            </div>
          ) : (
            <div className='tag center'>
              <div className='price'>
                <IntlProvider locale="vi">
                  <FormattedNumber
                    value={(price * (100 - discount)) / 100}
                    currency="VND"
                    minimumFractionDigits={0}
                  /><span className='underline'>đ</span>
                </IntlProvider>
              </div>
              <div className='basic_price-discount'>
                <div className='basic_price'>
                  <IntlProvider locale="vi">
                    <FormattedNumber
                      value={price} currency="VND"
                      minimumFractionDigits={0}
                    /><span className='underline'>đ</span>
                  </IntlProvider>
                </div>
                <span className='discount'>-{discount}%</span>
              </div>
            </div>
          )}
        </div>
      </NavLink>
    </div >
  )
}

export default Item