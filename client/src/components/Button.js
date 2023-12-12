import React, { memo } from 'react';

const Button = ({ text, IcAfter, onClick, fullWidth, backgroundSelect, colorSelect }) => {
  return (
    <button
      type='button'
      className={`py-1 px-2 border border-[#000] bg-[${colorSelect && '#000'}] text-[${backgroundSelect && '#fff'}] ${fullWidth && 'w-full'} hover:bg-[#000] hover:text-[#fff] font-semibold flex items-center justify-center`}
      onClick={onClick}
    >
      <span>{text}</span>
      <span>{IcAfter && <IcAfter />}</span>
    </button>
  )
}

export default memo(Button);