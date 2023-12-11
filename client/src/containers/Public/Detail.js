import icons from '../../utils/icons'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/index'
import * as actions from '../../store/actions'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const { IoHeartSharp, IoHeartOutline } = icons

const Detail = () => {
  let same = false;
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const url = location.pathname
  const parts = url.split('/')
  const lastPart = parts[parts.length - 1]
  const id = parseInt(lastPart)
  const [likess, setLikess] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const { likes } = useSelector(state => state.app)
  const { images } = useSelector(state => state.image)
  const [changedImage, setChangedImage] = useState(null)
  const { isLoggedIn } = useSelector(state => state.auth)
  const { currentData } = useSelector(state => state.user)
  const { quantities } = useSelector(state => state.quantity)
  const { products } = useSelector(state => state.product)
  const [selectedImageUrl, setSelectedImageUrl] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleLike = (id) => {
    const updatedPayload = {
      idAccount: currentData.id, idProduct: id
    };
    if (Array.isArray(likess)) {
      const existingLikeIndex = likess.findIndex(
        (item) => item.idProduct === id && item.idAccount === currentData.id
      );
      if (existingLikeIndex > -1) {
        setIsLiked(true);
        return;
      }
    }
    dispatch(actions.createLikes(updatedPayload));

    const updatedLikes = [...likess, updatedPayload];
    setLikess(updatedLikes);
    setIsLiked(true);
  };

  const handleUnLike = (id) => {
    const updatedPayload = {
      idAccount: currentData.id,
      idProduct: id,
    };
    dispatch(actions.deleteLikes(updatedPayload));

    const updatedLikes = likess.filter(
      (item) => item.idProduct !== id || item.idAccount !== currentData.id
    );
    setLikess(updatedLikes);

    const hasSomeLikes = updatedLikes.some(
      (item) => item.idProduct === id && item.idAccount === currentData.id
    );
    setIsLiked(hasSomeLikes || false);
  };

  useEffect(() => {
    if (Array.isArray(likes)) {
      const hasLiked = likes.some(
        (item) => item.idProduct === id && item.idAccount === currentData.id
      );
      setIsLiked(hasLiked);
    }
  }, [likes, id, currentData]);

  useEffect(() => {
    dispatch(actions.getLikes())
    dispatch(actions.getImages())
    dispatch(actions.getProducts())
    dispatch(actions.getQuantities())
  }, [dispatch])

  useEffect(() => {
    const defaultImageUrl = images.find(item => item.idProduct === id)?.image1 || '';
    setSelectedImageUrl(defaultImageUrl);
  }, [images, id]);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    const selectedImageKey = `image${index + 1}`;
    const selectedImage = images.find(item => item.idProduct === id);
    const imageUrl = selectedImage ? selectedImage[selectedImageKey] : '';
    setSelectedImageUrl(imageUrl);
  };

  const generateThumbnailList = () => {
    return Array.from({ length: 8 }, (_, index) => {
      const isSelected = selectedImageIndex === index;

      return (
        <li key={index} className='my-[2%]'>
          <img
            src={`/images/${images.find(item => item.idProduct === id)[`image${index + 1}`]}`}
            alt={''}
            className={`h-[5%] object-cover ${isSelected ? 'selected' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        </li>
      );
    });
  };


  return (
    <>
      {products?.length > 0 && products.map(product => {
        if (product.id === id)
          return (
            <div className='detail'>
              <div className='detail_image'>
                <div className='detail_image-bar center'>
                  <ul>{generateThumbnailList()}</ul>
                </div>
                {selectedImageUrl && (
                  <img
                    src={`/images/${selectedImageUrl}`}
                    alt={product.name}
                    className='h-[90%] object-cover transition duration-300'
                  />
                )}
              </div>
              <div className='detail_content'>
                {isLoggedIn ? (
                  <div className='like-unlike'>
                    {isLiked ? (
                      <span className="icons" onClick={() => handleUnLike(id)}><IoHeartSharp style={{ color: 'red' }} /></span>
                    ) : (
                      <span className="icons" onClick={() => handleLike(id)}><IoHeartOutline /></span>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                <div className='detail_content-title'>{product.name}</div>
                <div className='detail_content-id'>ID: {product.id}</div>
                <div className='detail_content-price'>
                  {product.discount === 0 ? (
                    <p className='price'>{product.price.toLocaleString()} đ</p>
                  ) : (
                    <p className='price flex items-center'>
                      <span>{((product.price * (100 - product.discount)) / 100).toLocaleString()} đ</span>
                      <span className='line-through text-base pl-1 text-[#a0a0a0]'>{product.price.toLocaleString()}</span>
                      <span className='text-base ml-1 px-[0.35rem] py-[0.025rem] text-[#fff] bg-[#000]'>-{product.discount}%</span>
                    </p>
                  )}
                </div>
                <div className='detail_content-select'>
                  <div className='select-color'>
                    <div>Color</div>
                    {quantities?.length > 0 && quantities.map(item => {
                      if (item.idProduct === id ) {
                        // same = true;
                        return (
                          <div className='box_color' style={{ backgroundColor: item?.quantity_color?.code}}></div>
                        )
                      } return null
                    })}
                  </div>
                  <div className='select-size'></div>
                </div>
                <div className='detail_content-button flex gap-3'>
                  <Button text={'Add to cart'} />
                  <Button text={'Buy now'} />
                </div>
                <div className='detail_content-infor'>abc</div>
              </div>
            </div>
          )
        return null;
      })}
    </>
  )
}

export default Detail