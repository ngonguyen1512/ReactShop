import React, {memo} from 'react';

const Button = ({text, IcAfter, onClick, fullWidth }) => {
  return (
    <button 
      type='button' 
      className={`py-1 px-2 border border-[#000] ${fullWidth && 'w-full'} hover:bg-[#000] hover:text-[#fff] font-semibold flex items-center justify-center`}
      onClick={onClick}
    >
        <span>{text}</span>
        <span>{IcAfter&& <IcAfter />}</span>
    </button>
  )
}

export default memo(Button);