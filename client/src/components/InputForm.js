import React, { memo } from 'react'

const InputForm = ({ label, text, value, multiple, setValue, keyPayload, type, invalidFields, setInvalidFields, disabled, hidden }) => {
  return (
    <div>
      <label htmlFor='phone' className='text-xs mt-4'>{label}</label>
      <input id={keyPayload}
        type={type} value={value}
        placeholder={text}
        disabled={disabled}
        multiple={multiple}
        
        onFocus={() => setInvalidFields([])}
        className='outline-none bg-[#e7e7e7] p-2 h-[46px] w-full text-black'
        onChange={(e) => setValue(prev => ({ ...prev, [keyPayload]: e.target.value }))}
      />
      {invalidFields.length > 0
        && invalidFields.some(i => i.name === keyPayload)
        && <small className='text-red-500 italic'>{invalidFields.find(i => i.name === keyPayload)?.msg}</small>
      }
    </div>
  )
}

export default memo(InputForm);