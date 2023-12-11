import React, { memo } from 'react'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const notActive = 'w-[46px] h-[42px] flex justify-center items-center text-black bg-white mb-4 hover:bg-[#838383] hover:text-white rounded-lg font-semibold cusor-pointer text-lg'
const active = 'w-[46px] h-[42px] flex justify-center items-center text-white bg-black mb-4 hover:text-white hover:opacity-80 rounded-lg font-semibold cusor-pointer text-lg'

const PageNumber = ({text, currentPage, icon, setCurrentPage}) => {
  const navigate = useNavigate();
  const location = useLocation;
  const [paramsSeach] = useSearchParams();
  let entries = paramsSeach.entries();

  const append = (entries) => {
      let params = []
      paramsSeach.append('page', +text)
      for (let entry of entries) params.push(entry);
      let searchParamsObject = {}
      params?.forEach(i => {
        if (Object.keys(searchParamsObject)?.some(item => item === i[0] && item !== 'page')) 
          searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
        else 
          searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
      })
      return searchParamsObject;
  }
  
  const handleChangePage = () => {
    if (!(text === '...')) {
      setCurrentPage(+text)
      navigate({
          pathname: location?.pathname,
          search: createSearchParams(append(entries)).toString()
      });
    }
  }
  return (
    <div 
      className={+text === +currentPage ? `${active} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}` : `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}` }
      onClick={handleChangePage}  
    >
      {icon || text}
    </div>
  )
}

export default memo(PageNumber);