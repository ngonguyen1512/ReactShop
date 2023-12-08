import React, { useCallback, useEffect, useRef, useState } from 'react'
import icons from '../../utils/icons'
import { NavLink, createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import { path } from '../../utils/constant'
import * as actions from '../../store/actions'
import { Button, Menu } from '../../components'

const { GoSearch, GiWolfHowl, MdOutlineShoppingCart } = icons

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch()
  const showMenuRef = useRef(null)
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]
  const { isLoggedIn } = useSelector(state => state.auth)
  const { currentData } = useSelector(state => state.user)
  const permis = currentData.idPermission
  const { images } = useSelector(state => state.image)
  const { products } = useSelector(state => state.product)
  const { transmissions } = useSelector(state => state.transmission)
  const { categories } = useSelector(state => state.category)
  const [searchValue, setSearchValue] = useState("")
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [shouldReload, setShouldReload] = useState(false)
  const [isShowSearch, setIsShowSearch] = useState(false)
  const [isShowMiniCart, setIsShowMiniCart] = useState(false)

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
    filteredProducts = products.filter((item) =>
      item.name.includes(searchValue)
    );
  }

  const goLogin = useCallback((flag) => {
    navigate('/' + path.LOGIN, { state: { flag } })
  }, [navigate])

  const handleLogout = () => {
    // removeAllFromCart();
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
    dispatch(actions.getCategories())
    dispatch(actions.getTransmissions(searchParamsObject))
  }, [dispatch, permis]);

  const renderTableRow = (item) => {
    return (
      <NavLink onClick={() => setIsShowSearch(false)} to={`/${item?.categories?.name}/detail/${formatVietnameseToString(item?.name)}/${item.id}`} className='flex py-1'>
        <div className='w-[25%]'>
          {images?.length > 0 && images.map(items => items.idProduct === item.id && (
            <img  src={`/images/${items.image1}`} alt={item.name} className='w-[70%]' />
          ))}
        </div>
        <div>
          <p>{item.name}</p>
          <span>{(item.price).toLocaleString()}</span>
        </div>
      </NavLink>
    );
  };

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
              })

              }
            </div>
          )}
        </div>
        <div className='search-cart-login text-xl'>
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
                      <div className='search_product'>
                        {shouldReload && filteredProducts.length > 0 && filteredProducts.map((item) => renderTableRow(item))}
                      </div>
                    </div>
                  </>
                }
              </div>
              <div className='cart'>
                <MdOutlineShoppingCart />
              </div>
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