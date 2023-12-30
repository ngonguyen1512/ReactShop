import $ from 'jquery'
import { Footer, Header } from './index'
import * as actions from '../../store/actions'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Slide, Tag, TextSlide } from '../../components/index'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { path } from '../../utils/constant'

const Home = () => {
  const headerRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page')
  const sample = searchParams.get('sample')
  const { isLoggedIn } = useSelector(state => state.auth)
  const { currentData } = useSelector(state => state.user)
  const { categories } = useSelector(state => state.category)
  const idpermis = parseInt(currentData.idPermission)

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.pathname, page, sample])

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
      if(idpermis === 1 || idpermis === 2 ) navigate(path.HOMESERVER+'/'+path.DASHBOARD)
      else if (idpermis === 3) navigate(path.HOMESERVER+'/'+path.INVOICE+'/'+path.PROCESSING)
    }, 100)
    dispatch(actions.getCategories())
  }, [isLoggedIn, dispatch, idpermis, navigate])

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
          <TextSlide texts='NEW ARRIVAL' quantity={2} />
        </>
      }
      <div className='main'>
        <Outlet />
      </div>
      <TextSlide texts='WELCOME TO FASHION STORE' quantity={1} />
      <Footer />
    </div>
  )
}

export default Home