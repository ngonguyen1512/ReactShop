import $ from 'jquery'
import Swal from 'sweetalert2'
import React, { useEffect } from 'react'
import { Header } from '../Public/index'
import * as actions from '../../store/actions'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const HomeServer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector(state => state.auth)
  const { currentData } = useSelector(state => state.user)
  const idpermis = parseInt(currentData.idPermission)

  useEffect(() => {
    const handleScroll = () => {
      const scroll = $(window).scrollTop();
      $('.header').toggleClass('fixed', scroll > 0);
    };
    $(window).scroll(handleScroll);
    return () => { $(window).off('scroll', handleScroll) };
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
      if (!isLoggedIn || idpermis === 4) {
        Swal.fire('Oops!', 'You can not access this page. THANKS!!!', 'error');
        navigate('/');
      }
    }, 100)
  }, [isLoggedIn, dispatch, navigate, idpermis])

  return (
    <div className='home'>
      <Header />
      <div className='main'>
        <Outlet />
      </div>
    </div>
  )
}

export default HomeServer