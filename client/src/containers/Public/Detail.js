import icons from '../../utils/icons'
import { path } from '../../utils/constant'
import * as actions from '../../store/actions'
import { Button } from '../../components/index'
import { CartContext } from '../../contexts/Cart'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const { IoHeartSharp, IoHeartOutline } = icons

const Detail = () => {
  const location = useLocation()
  const url = location.pathname
  const parts = url.split('/')
  const lastPart = parts[parts.length - 1]
  const id = parseInt(lastPart)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const uniqueSizeIds = new Set()
  const [likess, setLikess] = useState([])
  const [idSize, setIdSize] = useState(null)
  const [idColor, setIdColor] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { likes } = useSelector(state => state.app)
  const [currentPath, setCurrentPath] = useState('')
  const { colors } = useSelector(state => state.color)
  const { images } = useSelector(state => state.image)
  const { isLoggedIn } = useSelector(state => state.auth)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const { currentData } = useSelector(state => state.user)
  const { products } = useSelector(state => state.product)
  const { quantities } = useSelector(state => state.quantity)
  const { dimensions } = useSelector(state => state.dimension)
  const [selectedImageUrl, setSelectedImageUrl] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleSelectIdColor = (code) => {
    if (Array.isArray(colors)) {
      const foundItem = colors.find((item) => item.code === code);
      if (foundItem) setIdColor(foundItem.id);
    }
    setSelectedColor(code);
    const selectedImage = images.find(item => item.idProduct === id && item.image_color.code === code);
    if (selectedImage) {
      setSelectedImage(selectedImage);
      setSelectedImageUrl(selectedImage.image1);
    }
  };
  const handleSelectIdSize = (idSize) => { setIdSize(idSize) }

  useEffect(() => {
    setCurrentPath(location.pathname);
    const firstImage = images.find(item => item.idProduct === id);
    if (firstImage) {
      setSelectedImageIndex(0);
      setSelectedImage(firstImage);
      setSelectedImageUrl(firstImage.image1);
    }
    const firstColor = quantities.find(item => item.idProduct === id);
    if (quantities?.length > 0) {
      setIdColor(firstColor.idColor)
      setIdSize(firstColor.idSize)
      setSelectedColor(firstColor?.quantity_color.code);
    }
  }, [id, images, quantities, location.pathname]);

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
    dispatch(actions.getDimensions())
  }, [dispatch])

  const formatInformation = (information) => {
    const formattedDescriptions = information.split(/\n(?=\S)|\n(?=[A-Z])/)
      .map((desc, index) => <ul className='detail_infor' key={index}><li>{desc.trim()}</li></ul>);
    return formattedDescriptions;
  };
  const handleMouseMove = (event) => {
    const image = document.getElementById('zoomImage');
    const boundingBox = image.getBoundingClientRect();
    const x = (event.clientX - boundingBox.left) / boundingBox.width * 100;
    const y = (event.clientY - boundingBox.top) / boundingBox.height * 100;

    image.style.setProperty('--x', `${x}%`);
    image.style.setProperty('--y', `${y}%`);
  };

  return (
    <>
      {products?.length > 0 && products.map(product => (
        product.id === id &&
        <div className='detail'>
          <div className='detail_image'>
            <div className='detail_image-bar'>
              <ul>{generateThumbnailList()}</ul>
            </div>
            {selectedImageUrl && (
              <div class="image-container" onMouseMove={handleMouseMove}>
                <img id="zoomImage" alt={product.name}
                  src={`/images/${selectedImageUrl}`}
                  className={`image-img object-cover transition duration-300 ${isHovered ? 'zoomed' : ''}`}
                />
              </div>
            )}
            <div className='space-bar'></div>
          </div>
          <div className='detail_content'>
            {isLoggedIn && (
              <div className='like-unlike'>
                {isLiked ? (
                  <span className="icons" onClick={() => handleUnLike(id)}><IoHeartSharp style={{ color: 'red' }} /></span>
                ) : (
                  <span className="icons" onClick={() => handleLike(id)}><IoHeartOutline /></span>
                )}
              </div>
            )}
            <div className='detail_content-title'>{product.name}</div>
            <div className='detail_content-id'>ID: {product.id}</div>
            <div className='detail_content-price'>
              {product.discount === 0 ? (
                <p className='price'>{product.price.toLocaleString()}<span className='underline'>đ</span></p>
              ) : (
                <p className='price flex items-center'>
                  <span className='discount'>-{product.discount}%</span>
                  <span className='price_discount'>{((product.price * (100 - product.discount)) / 100).toLocaleString()}<span className='underline'>đ</span></span>
                  <span className='price_basic'>{product.price.toLocaleString()}<span className='underline'>đ</span></span>
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
                          <div key={color.id}
                            className={`box_color center ${selectedColor === color.code ? 'selected' : ''}`}
                            style={{ backgroundColor: color.code }}
                            onClick={() => handleSelectIdColor(color.code)}
                          ></div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className='select-size'>
                <div className=''>Size</div>
                <div className='box_size'>
                  {quantities?.length > 0 && quantities.map((item) =>
                    item.idProduct === id && item.quantity > 2 && (
                      <>
                        {dimensions?.length > 0 && dimensions.map(size => {
                          if (size.id === item.idSize && !uniqueSizeIds.has(size.id)) {
                            const isSelected = size.id === idSize;
                            uniqueSizeIds.add(size.id);
                            return (
                              <Button fullWidth key={size.id} text={size.code}
                                onClick={() => {
                                  handleSelectIdSize(size.id)
                                }}
                                backgroundSelect={isSelected ? '#000' : ''}
                                colorSelect={isSelected ? '#fff' : ''}
                              />
                            );
                          }
                          return null;
                        })}
                      </>
                    ))}
                </div>
              </div>
            </div>
            <div className='detail_content-button'>
              <CartContext.Consumer>
                {({ addToCart }) =>
                  <>
                    <Button fullWidth text={'ADD TO CART'}
                      onClick={() => addToCart(product, idColor, idSize)}
                    />
                    <Button fullWidth text={'BUY NOW'}
                      onClick={() => {
                        addToCart(product, idColor, idSize)
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
      ))}
    </>
  )
}

export default Detail