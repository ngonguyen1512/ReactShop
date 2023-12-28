import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString'

const Tag = ({ id, image, name }) => {
    return (
        <NavLink to={`/${formatVietnameseToString(name)}`} className='tag'>
            <div className='tag_image'>
                <img key={id} alt={name} src={`/images/${image}`}/>
            </div>
            <p className='tag_title'>{name}</p>
        </NavLink>
    )
}

export default memo(Tag);