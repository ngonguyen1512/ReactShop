import icons from '../utils/icons'
import React, { useEffect, useState } from 'react'
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
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

  const handleMouseEnter = () => { setChangedImage('image2') };
  const handleMouseLeave = () => { setChangedImage('image1') };

  const handleLike = (id) => {
    const updatedPayload = { idAccount: idCurrent, idProduct: id };
    if (Array.isArray(likes) && !likes.some((item) => item.idProduct === id && item.idAccount === idCurrent)) {
      dispatch(actions.createLikes(updatedPayload));
      setLikess([...likess, updatedPayload]);
      setIsLiked(true);
    }
  };

  const handleUnLike = (id) => {
    const updatedPayload = { idAccount: idCurrent, idProduct: id };
    dispatch(actions.deleteLikes(updatedPayload));
    const updatedLikes = likess.filter((item) => item.idProduct !== id || item.idAccount !== idCurrent);
    setLikess(updatedLikes);
    setIsLiked(updatedLikes.some((item) => item.idProduct === id && item.idAccount === idCurrent) || false);
  };

  useEffect(() => {
    if (Array.isArray(likes)) {
      const hasLiked = likes.some(
        (item) => item.idProduct === id && item.idAccount === idCurrent
      );
      setIsLiked(hasLiked);
    }
  }, [likes, id, idCurrent]);

  useEffect(() => {
    dispatch(actions.getLikes())
    dispatch(actions.getImages())
  }, [dispatch])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='item' key={id}>
      {isLoggedIn ? (
        <div className='like-unlike'>
          {isLiked ? (
            <span className="icons" onClick={() => handleUnLike(id)}><IoHeartSharp style={{ color: 'red' }} /></span>
          ) : (
            <span className="icons" onClick={() => handleLike(id)}><IoHeartOutline /></span>
          )}
        </div>
      ) : (<></>)}
      <NavLink onClick={handleClick} to={`/${formatVietnameseToString(nameCategory)}/${formatVietnameseToString(name)}/${id}`} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className='image center'>
          {images?.length > 0 && images.map(item => {
            if (item.idProduct === id && !displayedImage) {
              displayedImage = true;
              return (
                <img key={item.id} src={`/images/${item[changedImage || 'image1']}`} alt={name} className='h-[80%] object-cover transition duration-300' />
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
                  /> đ
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
                  /> đ
                </IntlProvider>
              </div>
              <div className='basic_price-discount'>
                <div className='basic_price'>
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
      </NavLink>
    </div >
  )
}

export default Item