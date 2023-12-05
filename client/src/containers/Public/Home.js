import React, { useEffect } from 'react'
import { Header } from './index'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Slide } from '../../components/index'
import $ from 'jquery';
import * as actions from '../../store/actions'

const Home = () => {
  // const headerRef = useRef()
  const location = useLocation()
  const dispatch = useDispatch()
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    const handleScroll = () => {
      var scroll = $(window).scrollTop();
      if (scroll > 0) $('.header').addClass('fixed');
      else $('.header').removeClass('fixed');
    };
    $(window).scroll(handleScroll);
    return () => { $(window).off('scroll', handleScroll) };
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 100)
  }, [isLoggedIn, dispatch])

  return (
    <div className='home'>
      <Header />
      {parts === '' && <Slide />}
      <div className='main'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home