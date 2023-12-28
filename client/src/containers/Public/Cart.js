import icons from '../../utils/icons'
import { Button } from '../../components'
import { NavLink } from 'react-router-dom'
import { path } from '../../utils/constant'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/Cart'
import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useContext, useEffect } from 'react'

const { TiDeleteOutline } = icons

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useContext(CartContext)
  const { colors } = useSelector(state => state.color)
  const { images } = useSelector(state => state.image)
  const { isLoggedIn } = useSelector(state => state.auth)
  const { dimensions } = useSelector(state => state.dimension)

  const goLogin = useCallback((flag) => {
    navigate('/' + path.LOGIN, { state: { flag } })
  }, [navigate])

  useEffect(() => {
    dispatch(actions.getColors())
    dispatch(actions.getImages())
    dispatch(actions.getDimensions())
  }, [dispatch])

  return (
    <div className='cart'>
      <p className='cart_title'>YOUR CART</p>
      <CartContext.Consumer>
        {({ cartItems, updateQuantity, removeFromCart }) => {
          const total = cartItems.reduce((accumulator, product) =>
            accumulator + (product.price * product.quantity), 0);
          return (
            <div className='cart_table'>
              <table>
                <tr className='border-b'>
                  <th>ID</th>
                  <th className='image w-[10%]'>IMAGE</th>
                  <th>NAME</th>
                  <th>SIZE</th>
                  <th>COLOR</th>
                  <th>QUANTITY</th>
                  <th>PRICE</th>
                  <th className='w-[25%]'>TOTAL</th>
                  <th></th>
                </tr>
                {cartItems.map((product) => (
                  <tr className='border-b border-dashed' >
                    <td className='text-center'>{product.id}</td>
                    <td className='image w-[10%]'>
                      {images?.length > 0 && images.map(item => item.idProduct === product.id && item.idColor === product.idColor && (
                        <img src={`/images/${item.image1}`} alt={product.name}
                          className='h-[70%] object-cover' />
                      ))}
                    </td>
                    <td className='pl-4'>{product.name}</td>
                    <td className='text-center'>
                      {dimensions?.length > 0 && dimensions.map(item => item.id === product.idSize && (
                        <>{item.code}</>
                      ))}
                    </td>
                    <th className='text-center center'>
                      {colors?.length > 0 && colors.map(item => item.id === product.idColor && (
                        <div
                          className={'box_color'}
                          style={{ backgroundColor: item.code, alignSelf: 'center' }}
                        ></div>
                      ))}
                    </th>
                    <td className='text-center'>
                      <button className='bg-gray-500 rounded-sm mx-1.5'
                        onClick={() => updateQuantity(product, product.quantity - 1)}>-</button>
                      {product.quantity}
                      <button className='bg-gray-500 rounded-sm mx-1.5'
                        onClick={() => updateQuantity(product, product.quantity + 1)}>+</button>
                    </td>
                    <td className='text-center'>{product.price.toLocaleString()}</td>
                    <td className='text-center text-blue-500 w-[25%]'>{(product.price * product.quantity).toLocaleString()}</td>
                    <td className='text-red-500 text-xl'>
                      <button onClick={() => removeFromCart(product.id, product.idSize, product.idColor)}><TiDeleteOutline /></button>
                    </td>
                  </tr>
                ))}
                <tr className='border-t border-black'>
                  <td className='font-semibold pl-10 text-lg' colspan={4}>TOTAL ORDER</td>
                  <td className='text-center  text-xl font-semibold text-red-500'>{total.toLocaleString()}</td>
                  <td></td>
                </tr>
              </table>
            </div>
          )
        }}
      </CartContext.Consumer>
      {!isLoggedIn ? (
        <div className='footer center'>
          <span className='mr-2'>Please login to continue paying for the order!</span>
          <Button text={'Login'} bgColor='bg-secondary2' textColor='text-white' onClick={() => goLogin(false)} />
        </div>
      ) : (
        <div className='footer center'>
          <NavLink to={path.HOME} className='btn center'>COUNTINUE TO BUY</NavLink>
          {cartItems.length !== 0 &&
            <NavLink to={'/' + path.PAYMENT} className='btn center'>PAYMENT</NavLink>
          }
        </div>
      )}
    </div>
  )
}

export default Cart