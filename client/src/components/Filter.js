import Slider from 'rc-slider'
import icons from '../utils/icons'
import 'rc-slider/assets/index.css'
import * as actions from '../store/actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom'

const { TiDeleteOutline } = icons

const Filter = ({ title, isDouble, content, type, list }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState([0, 0])
  const { samples } = useSelector(state => state.sample)

  const handleSliderChange = (newValue) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ min: value[0], max: value[1] }).toString()
    });
    setValue(newValue);
    if (onchange) onchange(newValue);
  };
  const handleDeleteClick = () => {
    const newSliderValues = [0, 0]
    handleSliderChange(newSliderValues)
    navigate('/')
  };

  useEffect(() => {
    dispatch(actions.getAllSamples())
  }, [dispatch]);

  const handleFilterPosts = (id) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ [type]: id }).toString()
    })
  }

  return (
    <div className='filter'>
      {isDouble ? (
        <div className='filter-price center'>
          <p className='filter-tilte'>{title}: {value[0].toLocaleString()} - {value[1].toLocaleString()}</p>
          <Slider
            min={0} max={2000000} range
            value={value} onChange={handleSliderChange}
            style={{ width: '55%', margin: '0 2%' }}
          />
          <p className='w-[5%]' onClick={handleDeleteClick}><TiDeleteOutline /></p>
        </div>
      ) : (
        <div className='filter-category'>
          {content?.length > 0 && list?.length > 0 && content.map(item => (
            <div className='tagname center'>
              {samples?.length > 0 && samples.map(items =>
                items.idCategory === item.id && item.name === list && items.idState === 2 && (
                  <div onClick={() => handleFilterPosts(items.id)}
                    className={`mx-2 px-2 py-1 hover:text-blue-500`}
                  >{items.name}</div>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Filter