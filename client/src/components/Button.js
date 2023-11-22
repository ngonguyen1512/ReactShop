import React, {memo} from 'react';

const Button = ({text, textColor, bgColor, IcAfter, onClick, fullWidth }) => {
  return (
    <button 
      type='button' 
      className={`py-2 px-3 ${textColor} ${bgColor} ${fullWidth && 'w-full'} border border-[#000] hover:bg-[#000] hover:text-[#fff] font-semibold flex items-center justify-center`}
      onClick={onClick}
    >
        <span>{text}</span>
        <span>{IcAfter&& <IcAfter />}</span>
    </button>
  )
}

export default memo(Button);