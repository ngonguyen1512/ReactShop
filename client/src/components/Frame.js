import React, { memo } from 'react'

const Frame = ({ title, total, color, background, icon }) => {
    const frameIconStyle = {
        backgroundColor: background,
    };

    const frameContentStyle = {
        color: color,
    };
    return (
        <div className='frame'>
            <div className='frame_icon center' style={frameIconStyle} >{icon}</div>
            <div className='frame_content'>
                <p className='frame_title'  style={frameContentStyle}>{title}</p>
                <p className='frame_total'>{total}</p>
            </div>
        </div>
    )
}

export default memo(Frame);