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
  const { transmissions } = useSelector(state => state.transmission)
  const { categories } = useSelector(state => state.category)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [isShowSearch, setIsShowSearch] = useState(false)
  const [isShowMiniCart, setIsShowMiniCart] = useState(false)

  const handleFilterPosts = (id) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ id }).toString()
    });
  };

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
    dispatch(actions.getCurrent())
    dispatch(actions.getTransfers())
    dispatch(actions.getCategories())
    dispatch(actions.getTransmissions(searchParamsObject))
  }, [dispatch, permis]);

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
              <div className='search'>
                <span><GoSearch /></span>
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