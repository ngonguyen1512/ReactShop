import React from 'react'
import icons from '../../utils/icons'
import { NavLink } from 'react-router-dom';

const { FaSquareGithub, FaSquareFacebook, FaSquareInstagram } = icons;

const Footer = () => {
  return (
    <div className='footer'>
      <table className='w-full'>
        <tr>
          <td className='font-semibold'>STORE</td>
          <td className='w-[40%] font-semibold'>SOCIAL MEDIA</td>
        </tr>
        <tr>
          <td>
            FASHION STUDIO: 273 AN DUONG VUONG STREET, DISTRICT 5, HCM.
          </td>
          <td className='w-[40%]'>
            <NavLink to='https://web.facebook.com/ngonguyenthanhnguyen1349' target="_blank" rel="noopener noreferrer" className='flex'>
              <span className='icons-media'><FaSquareFacebook /></span> Facebook
            </NavLink>
          </td>
        </tr>
        <tr>
          <td>Store 2: 26 LY TU TRONG STREET, DISTRICT 1, HCM.</td>
          <td className='w-[40%]'>
            <NavLink to='https://www.instagram.com/ngo__nguyen__152/' target="_blank" rel="noopener noreferrer" className='flex'>
              <span className='icons-media'><FaSquareInstagram /></span> Instagram
            </NavLink>
          </td>
        </tr>
        <tr>
          <td>Store 3: 350 DIEN BIEN PHU STREET, WARD 7, BINH THANH DISTRICT, HCM.</td>
          <td className='w-[40%]'>
            <NavLink to='https://github.com/ngonguyen1512' target="_blank" rel="noopener noreferrer" className='flex text-center'>
              <span className='icons-media'><FaSquareGithub /></span> Github
            </NavLink>
          </td>
        </tr>
        <tr>
          <td>Store 4: 140 NGUYEN HY QUANG, DONG DA DISTRICT, HANOI.</td>
          <td className='w-[40%]'></td>
        </tr>
      </table>
    </div >
  )
}

export default Footer