import React, { useEffect } from 'react'
import { Header } from '../Public/index'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import $ from 'jquery'
import Swal from 'sweetalert2'

const HomeServer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    const handleScroll = () => {
      var scroll = $(window).scrollTop();
      if (scroll > 0) $('.navigation').addClass('fixed');
      else $('.navigation').removeClass('fixed');
    };
    $(window).scroll(handleScroll);
    return () => { $(window).off('scroll', handleScroll) };
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire('Oops!', 'You can not access this page. THANKS!!!', 'error');
      navigate('/');
    }
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 100)
  }, [isLoggedIn, dispatch, navigate])

  return (
    <div className='home'>
      <Header />
      <div className='main center'>
        <Outlet />
      </div>
    </div>
  )
}

export default HomeServer