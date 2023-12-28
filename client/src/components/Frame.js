import React, { memo } from 'react'

const Frame = ({ title, total, color, icon }) => {
    const frameIconStyle = {backgroundColor: color};
    const frameContentStyle = {color: color};
    return (
        <div className='structure'>
            <div className='structure_icon center' style={frameIconStyle} >{icon}</div>
            <div className='structure_content'>
                <p className='structure_title'  style={frameContentStyle}>{title}</p>
                <p className='structure_total'>{total.toLocaleString()}</p>
            </div>
        </div>
    )
}

export default memo(Frame);