import React, { useEffect, useRef } from 'react'
import { Footer, Header } from './index'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Slide, Tag, TextSlide } from '../../components/index'
import $ from 'jquery';
import * as actions from '../../store/actions'

const Home = () => {
  const headerRef = useRef()
  const location = useLocation()
  const dispatch = useDispatch()
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page')
  const sample = searchParams.get('sample')
  const { isLoggedIn } = useSelector(state => state.auth)
  const { categories } = useSelector(state => state.category)
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page, sample])

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
    dispatch(actions.getCategories())
  }, [isLoggedIn, dispatch])

  return (
    <div ref={headerRef} className='home'>
      <Header />
      {parts === '' &&
        <>
          <Slide />
          <div className='tag_category'>
            {categories?.length > 0 && categories.map(item => (
              <Tag id={item?.id} name={item?.name} image={item?.image} />
            ))}
          </div>
          <TextSlide texts='NEW ARRIVAL' quantity={2}/>
        </>
      }
      <div className='main'>
        <Outlet />
      </div>
      <TextSlide texts='WELCOME TO FASHION STORE' quantity={1}/>
      <Footer />
    </div>
  )
}

export default Home