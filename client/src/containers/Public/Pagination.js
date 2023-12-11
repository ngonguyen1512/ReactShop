import React, { useEffect, useState } from 'react';
import { PageNumber } from '../../components';
import icons from '../../utils/icons';

const { GrNext, GrPrevious } = icons;

const Pagination = ({ count, currentPage, setCurrentPage, counts }) => {
  const [arrPage, setArrPage] = useState([]);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);

  useEffect(() => {
    let maxPage = Math.ceil(count / 12);
    let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2)
    let start = (currentPage - 2) <= 1 ? 1 : (currentPage - 2)
    let temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setArrPage(temp);
    currentPage >= (maxPage - 2) ? setIsHideEnd(true) : setIsHideEnd(false)
    currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false)
  }, [count, currentPage]);

  return (
    <div className='pagination center gap-2'>
      {!isHideStart &&
        <PageNumber icon={<GrPrevious />} text={1} setCurrentPage={setCurrentPage} />
      }
      {arrPage.length > 0 && arrPage.map(item => {
        return (
          <PageNumber key={item} text={item}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )
      })}
      {!isHideEnd &&
        <PageNumber icon={<GrNext />}
          text={Math.ceil(count / counts.length)}
          setCurrentPage={setCurrentPage}
          type='end'
        />
      }
    </div>
  )
}

export default Pagination