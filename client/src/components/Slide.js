import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import * as actions from '../store/actions'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString'

const Slide = () => {
    const dispatch = useDispatch();
    const { slides } = useSelector(state => state.slide);
    useEffect(() => {
        dispatch(actions.getSlides());
    }, [dispatch])

    return (
        <div className='w-[100%]'>
            <Fade images={slides.slice(0, 3)}>
                {slides.map(item => item.idState === 2 && (
                    <NavLink to={`${formatVietnameseToString(item.name)}`}>
                        <div key={item.id}>
                            <img style={{ width: '100%', height: 'auto' }} src={`/images/${item.image}`} alt={item.name} loading='lazy'/>
                        </div>
                    </NavLink>
                ))}
            </Fade>
        </div>

    )
}

export default Slide;