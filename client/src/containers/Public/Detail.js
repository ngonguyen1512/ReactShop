import icons from '../../utils/icons'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/index'
import * as actions from '../../store/actions'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CartContext } from '../../contexts/Cart'
import { path } from '../../utils/constant'

const { IoHeartSharp, IoHeartOutline } = icons

const Detail = () => {
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
  const [currentPath, setCurrentPath] = useState('')
  const { colors } = useSelector(state => state.color)
  const { images } = useSelector(state => state.image)
  const { isLoggedIn } = useSelector(state => state.auth)
  const { currentData } = useSelector(state => state.user)
  const { quantities } = useSelector(state => state.quantity)
  const { products } = useSelector(state => state.product)
  const [selectedImageUrl, setSelectedImageUrl] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)

  const [idSize, setIdSize] = useState(null)
  const [idColor, setIdColor] = useState(null)

  console.log("id color: " + idColor)

  const handleSelectIdColor = (code) => {
    if (Array.isArray(colors)) {
      const foundItem = colors.find((item) => item.code === code);

      if (foundItem) {
        setIdColor(foundItem.id);
      }
    }
  };
  const handleSelectIdSize = (idSize) => {
    setIdSize(idSize)
  }

  const handleButtonClick = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
    window.scrollTo(0, 0);

    const firstImage = images.find(item => item.idProduct === id);
    if (firstImage) {
      setSelectedImageIndex(0);
      setSelectedImage(firstImage);
      setSelectedImageUrl(firstImage.image1);
    }

    if (quantities?.length > 0) {
      const firstColorCode = quantities[0].quantity_color.code;
      setSelectedColor(firstColorCode);
      setIdColor(quantities[0].idColor)

      const firstSizeCode = quantities[0].quantity_size.code;
      setSelectedSize(firstSizeCode);
      setIdSize(quantities[0].idSize)
    }
  }, [id, images, quantities, location.pathname]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    const selectedImage = images.find(item => item.idProduct === id && item.image_color.code === color);
    if (selectedImage) {
      setSelectedImage(selectedImage);
      setSelectedImageUrl(selectedImage.image1);
    }
  };
  useEffect(() => {
    const defaultImageUrl = images.find(item => item.idProduct === id)?.image1 || '';
    setSelectedImageUrl(defaultImageUrl);
  }, [images, id]);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    const selectedImageKey = `image${index + 1}`;
    const imageUrl = selectedImage ? selectedImage[selectedImageKey] : '';
    setSelectedImageUrl(imageUrl);
  };
  const generateThumbnailList = () => {
    return Array.from({ length: 4 }, (_, index) => {
      const isSelected = selectedImageIndex === index;
      return (
        <li key={index} className='my-[2%]'>
          <img
            src={`/images/${selectedImage ? selectedImage[`image${index + 1}`] : ''}`}
            alt={''}
            className={`w-[70%] object-cover ${isSelected ? 'selected' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        </li>
      );
    });
  }

  const handleLike = (id) => {
    const updatedPayload = { idAccount: currentData.id, idProduct: id };
    if (Array.isArray(likes) && !likes.some((item) => item.idProduct === id && item.idAccount === currentData.id)) {
      dispatch(actions.createLikes(updatedPayload));
      setLikess([...likess, updatedPayload]);
      setIsLiked(true);
    }
  };

  const handleUnLike = (id) => {
    const updatedPayload = { idAccount: currentData.id, idProduct: id };
    dispatch(actions.deleteLikes(updatedPayload));
    const updatedLikes = likess.filter((item) => item.idProduct !== id || item.idAccount !== currentData.id);
    setLikess(updatedLikes);
    setIsLiked(updatedLikes.some((item) => item.idProduct === id && item.idAccount === currentData.id) || false);
  };

  useEffect(() => {
    dispatch(actions.getLikes())
    dispatch(actions.getColors())
    dispatch(actions.getImages())
    dispatch(actions.getProducts())
    dispatch(actions.getQuantities())
  }, [dispatch])

  const formatInformation = (information) => {
    const formattedDescriptions = information.split(/\n(?=\S)|\n(?=[A-Z])/)
      .map((desc, index) => <p key={index}>- {desc.trim()}</p>);
    return formattedDescriptions;
  };

  return (
    <>
      {products?.length > 0 && products.map(product => {
        if (product.id === id)
          return (
            <div className='detail'>
              <div className='detail_image'>
                <div className='detail_image-bar h-[60%]'>
                  <ul>{generateThumbnailList()}</ul>
                </div>
                {selectedImageUrl && (
                  <img src={`/images/${selectedImageUrl}`} alt={product.name}
                    className='h-[70%] object-cover transition duration-300'
                  />
                )}
                <div className='w-[10%] h-[60%]'></div>
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
                ) : (<></>)}
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
                    <div className=''>Color</div>
                    {quantities?.length > 0 && (
                      <div className='select-color_box'>
                        {quantities.filter(item => item.idProduct === id).reduce((uniqueColors, item) => {
                          if (!uniqueColors.some(color => color.code === item.quantity_color.code))
                            uniqueColors.push({ code: item.quantity_color.code, sizes: [] });
                          const colorIndex = uniqueColors.findIndex(color => color.code === item.quantity_color.code);
                          uniqueColors[colorIndex].sizes.push(item.size);
                          return uniqueColors;
                        }, [])
                          .map(color => (
                            <div className={`p-[0.5%] mr-2% rounded-full ${selectedColor === color.code ? 'selected' : ''}`}
                              style={{ border: selectedColor === color.code ? '1px solid black' : '' }}>
                              <div
                                key={color.id}
                                className={`box_color center ${selectedColor === color.code ? 'selected' : ''}`}
                                style={{ backgroundColor: color.code }}
                                onClick={() => {
                                  handleColorClick(color.code)
                                  handleSelectIdColor(color.code)
                                }}
                              ></div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className='select-size'>
                    <div className=''>Size</div>
                    <div className='box_size'>
                      {quantities?.length > 0 && quantities.map(item => {
                        if (item.idProduct === id && item.quantity_color.code === selectedColor && item.quantity > 2) {
                          const isSelected = item.quantity_size.code === selectedSize;
                          return (
                            <Button
                              fullWidth
                              key={item.id}
                              text={item?.quantity_size?.code}
                              onClick={() => {
                                handleButtonClick(item.quantity_size.code)
                                handleSelectIdSize(item.idSize)
                              }}
                              backgroundSelect={isSelected ? '#000' : ''}
                              colorSelect={isSelected ? '#fff' : ''}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
                <div className='detail_content-button'>
                  <CartContext.Consumer>
                    {({ addToCart }) =>
                      <>
                        <Button
                          fullWidth
                          text={'ADD TO CART'}
                          onClick={() => addToCart(product, idColor, idSize)}
                        />
                        <Button
                          fullWidth
                          text={'BUY NOW'}
                          onClick={() => {
                            addToCart(product)
                            navigate('/' + path.CART)
                          }}
                        />
                      </>
                    }
                  </CartContext.Consumer>
                </div>
                <div className='detail_content-infor'>
                  <div className='infor_title'>INFORMATION</div>
                  {formatInformation(product.information)}
                </div>
              </div>
            </div>
          )
        return null;
      })}
    </>
  )
}

export default Detail