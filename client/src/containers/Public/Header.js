import icons from '../../utils/icons'
import { path } from '../../utils/constant'
import * as actions from '../../store/actions'
import { Button, Menu } from '../../components'
import { CartContext } from '../../contexts/Cart'
import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import { NavLink, createSearchParams, useLocation, useNavigate } from 'react-router-dom'

const { GoSearch, GiWolfHowl, MdOutlineShoppingCart, TiDeleteOutline } = icons

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch()
  const showMenuRef = useRef(null)
  const containerRef = useRef(null)
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]
  const cartContext = useContext(CartContext)
  const { removeAllFromCart } = cartContext
  const [searchValue, setSearchValue] = useState("")
  const [isShowMenu, setIsShowMenu] = useState(false)
  const { images } = useSelector(state => state.image)
  const [shouldReload, setShouldReload] = useState(false)
  const [isShowSearch, setIsShowSearch] = useState(false)
  const { isLoggedIn } = useSelector(state => state.auth)
  const { products } = useSelector(state => state.product)
  const { currentData } = useSelector(state => state.user)
  const { quantities } = useSelector(state => state.quantity)
  const [isShowMiniCart, setIsShowMiniCart] = useState(false)
  const { categories } = useSelector(state => state.category)
  const { transmissions } = useSelector(state => state.transmission)
  const permis = currentData.idPermission

  const handleFilterPosts = (id) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ id }).toString()
    });
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredProducts = [];
  if (products && Array.isArray(products)) {
    const searchRegex = new RegExp(searchValue, 'i');
    filteredProducts = products.filter((item) =>
      searchRegex.test(item.name)
    );
  }

  const goLogin = useCallback((flag) => {
    navigate('/' + path.LOGIN, { state: { flag } })
  }, [navigate])

  const handleLogout = () => {
    removeAllFromCart();
    setIsShowMenu(false);
    dispatch(actions.logout());
    navigate('/');
  }

  useEffect(() => {
    let searchParamsObject = {}
    if (permis) searchParamsObject.permis = permis
    dispatch(actions.getImages())
    dispatch(actions.getCurrent())
    dispatch(actions.getProducts())
    dispatch(actions.getTransfers())
    dispatch(actions.getQuantities())
    dispatch(actions.getCategories())
    dispatch(actions.getTransmissions(searchParamsObject))
  }, [dispatch, permis]);

  const renderTableRow = (item) => {
    let displayedImage = false;
    return (
      <NavLink onClick={() => setIsShowSearch(false)} to={`/${item?.product_category?.name}/${formatVietnameseToString(item?.name)}/${item.id}`} className='flex py-1'>
        <div className='w-[25%]'>
          {images?.length > 0 && images.map(items => {
            if (items.idProduct === item.id && !displayedImage) {
              displayedImage = true;
              return (
                <img src={`/images/${items.image1}`} alt={item.name} className='w-[70%]' />
              )
            }
            return null;
          })}
        </div>
        <div>
          <p>{item.name}</p>
          <span>{(item.price).toLocaleString()}</span>
        </div>
      </NavLink>
    );
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        // Clicked outside the component, close everything
        setIsShowSearch(false);
        setIsShowMenu(false);
        setIsShowMiniCart(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='header'>
      <div className='header-content'>
        <div className='logo-cate'>
          <NavLink to={'/'} className='logo text-2xl'>
            <GiWolfHowl /> <p className='text-logo'> FASHION</p>
          </NavLink>
          {parts !== 'webserver' ? (
            <div className='cate center'>
              {categories?.length > 0 && categories.map(item => {
                return (
                  <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className='content' onClick={() => handleFilterPosts(item.id)}>
                    {item.name}
                  </NavLink>
                )
              })}
            </div>
          ) : (
            <div className='cate center'>
              {transmissions?.length > 0 && transmissions.map(item => {
                if (item.idPermission === currentData.idPermission)
                  return (
                    <NavLink key={item.id} to={`${formatVietnameseToString(item?.transmission_transfer.name)}`} className='content'>
                      {item?.transmission_transfer.name}
                    </NavLink>
                  )
              })}
            </div>
          )}
        </div>
        <div className='search-cart-login text-xl' ref={containerRef}>
          {parts !== 'webserver' &&
            <>
              <div className='search' >
                <span onClick={() => setIsShowSearch(prev => !prev)}><GoSearch /></span>
                {isShowSearch &&
                  <>
                    <span className='square'></span>
                    <div className='search_content'>
                      <input
                        className='outline-none bg-[#e7e7e7] p-2 rounded-md w-full text-[#000]'
                        type="text"
                        placeholder='Search by name'
                        value={searchValue}
                        onChange={handleSearch}
                      />
                      {searchValue && (
                        <div className='search_product'>
                          {shouldReload && filteredProducts.length > 0 && filteredProducts.map((item) => renderTableRow(item))}
                        </div>
                      )}
                    </div>
                  </>
                }
              </div>
              <CartContext.Consumer>
                {({ cartItems, updateQuantity, removeFromCart }) => {
                  const total = cartItems.reduce((accumulator, product) =>
                    accumulator + (product.price * product.quantity), 0);
                  return (
                    <div className='minicart'>
                      <span className='center' onClick={() => setIsShowMiniCart(prev => !prev)}><MdOutlineShoppingCart /> ({cartItems.length})</span>
                      {isShowMiniCart &&
                        <>
                          <span className='square'></span>

                          {cartItems.length === 0 ? (
                            <div className='minicart_content text-[#fff] center min-w-[200px]'>
                              <p>There is no product</p>
                            </div>
                          ) : (
                            <div className='minicart_content text-[#fff] min-w-[600px]'>
                              <table className='w-full'>
                                <tr className='border-b'>
                                  <th className=''>NAME</th>
                                  <th className=''>SIZE</th>
                                  <th className=''>COLOR</th>
                                  <th className=''>QUANTITY</th>
                                  <th className=''>PRICE</th>
                                  <th className='w-[5%]'></th>
                                </tr>
                                {cartItems.map((product) => (
                                  <tr className='border-b border-dashed' key={product.id}>
                                    <td className=''>{product.name}</td>
                                    <td className='text-center'>{product.idSize}</td>
                                    <td className='text-center'>{product.idColor}</td>
                                    <td className='text-center '>
                                      <button className='px-1.5 bg-gray-500 rounded-sm mx-1.5'
                                        onClick={() => updateQuantity(product, product.quantity - 1)}>-</button>
                                      {product.quantity}
                                      <button className='px-1.5 bg-gray-500 rounded-sm mx-1.5'
                                        onClick={() => updateQuantity(product, product.quantity + 1)}>+</button>
                                    </td>
                                    <td className='text-center '>{(product.price * product.quantity).toLocaleString()}</td>
                                    <td className='text-red-500 text-xl w-[5%]'>
                                      <button onClick={() => removeFromCart(product.id, product.idSize, product.idColor)}><TiDeleteOutline /></button>
                                    </td>
                                  </tr>
                                ))}
                                <tr className='border-t border-black'>
                                  <td className='font-semibold pl-10 text-lg' colSpan={2}>TOTAL</td>
                                  <td className='text-center text-xl font-semibold' colSpan={2}>{total.toLocaleString()} đ</td>
                                  <td></td>
                                </tr>
                              </table>
                              <Button
                                text={'Go to cart'}
                                onClick={() => {
                                  navigate('/' + path.CART);
                                  setIsShowMiniCart(false)
                                }}
                              />
                            </div>
                          )}
                        </>
                      }
                    </div>
                  )
                }}
              </CartContext.Consumer>
            </>
          }
          <div className='login'>
            {!isLoggedIn ? (
              <div className='login'>
                <button onClick={() => goLogin(false)}>LOGIN</button>
              </div>
            ) : (
              <div className='account' ref={showMenuRef}>
                <Button
                  text={'Account'}
                  onClick={() => setIsShowMenu(prev => !prev)}
                />
                {isShowMenu &&
                  <div className='menu'>
                    <Menu permis={currentData.idPermission} />
                    <span onClick={() => handleLogout()}>Logout</span>
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      </div >
    </div >
  )
}

export default Header