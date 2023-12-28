import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../../components'
import { path } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'

const Information = () => {
  const navigate = useNavigate()
  const { currentData } = useSelector(state => state.user)
  const handleUpdate =() => {
    navigate(path.UPDATE_ACCOUNT)
  }

  return (
    <div className='information'>
      <p className='title'>ACCOUNT INFORMATION</p>
      <ul className='content_information'>
        <li>{currentData.name}</li>
        <li>{currentData.phone}</li>
        <li>{currentData.email}</li>
        <li>{currentData.address}</li>
      </ul>
      <Button text={'Update account'} onClick={handleUpdate}/>
    </div>
  )
}

export default Information