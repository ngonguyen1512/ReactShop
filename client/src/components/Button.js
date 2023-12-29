import React, { memo } from 'react';

const Button = ({ text, IcAfter, onClick, fullWidth}) => {
  return (
    <button
      type='button'
      className={`button center ${fullWidth && 'w-full'}`}
      onClick={onClick}
    >
      <span>{text}</span>
      <span>{IcAfter && <IcAfter />}</span>
    </button>
  )
}

export default memo(Button);