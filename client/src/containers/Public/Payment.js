import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../utils/constant';
import { Button, InputForm } from '../../components'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../../contexts/Cart';
import icons from '../../utils/icons'
import * as actions from '../../store/actions'
import Swal from 'sweetalert2';

const { TiDeleteOutline } = icons

const Payment = () => {
  const transportFee = 40000
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartContext = useContext(CartContext)
  const { removeAllFromCart } = cartContext
  const { colors } = useSelector(state => state.color)
  const { images } = useSelector(state => state.image)
  const [invalidFields, setInvalidFields] = useState([])
  const { currentData } = useSelector(state => state.user)
  const { dimensions } = useSelector(state => state.dimension)
  const { isLoggedIn } = useSelector(state => state.auth)
  const { cartItems } = useContext(CartContext)
  const idcurrent = parseInt(currentData.id)

  const [payload, setPayload] = useState({
    idAccount: idcurrent, name: '' || currentData.name,
    phone: '' || currentData.phone, email: '' || currentData.email,
    address: '' || currentData.address, ship: '', total: '', idState: '3',
    invoiceDetails: [],
  });
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, {
          name: item[0],
          msg: 'You must not vacate this field!'
        }])
        invalids++;
        return;
      } else if (item[1] !== '') {
        switch (item[0]) {
          case 'email': {
            if (!/\S+@\S+\.\S+/.test(item[1])) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Invalid email!'
              }])
              invalids++;
            }
            break;
          }
          case 'phone': {
            if (!+item[1]) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Invalid phone number!'
              }])
              invalids++;
            }
            break;
          }
          default: break;
        }
      }
    })
    return invalids;
  }

  const calculateTotal = (cartItems) => {
    let amount = 0;
    for (const product of cartItems)
      amount += product.price * product.quantity;
    return amount;
  };

  const handleCreateInvoices = async (cartItems) => {
    const amount = calculateTotal(cartItems);
    const invoiceDetails = cartItems.map((product) => ({
      idProduct: product.id, name: product.name, idColor: product.idColor,
      idSize: product.idSize, quantity: product.quantity, price: product.price,
      discount: product.discount, amount: amount
    }));
    const payload = {
      idAccount: idcurrent, phone: currentData.phone, email: '' || currentData.email,
      address: currentData.address, ship: transportFee, total: (amount + transportFee), idState: 3,
      invoiceDetails: invoiceDetails
    };
    try {
      await dispatch(actions.createInvoices(payload));
      Swal.fire({
        title: 'Success!', text: 'Your order has been submitted successfully.',
        icon: 'success', showConfirmButton: true
      });
      removeAllFromCart();
      navigate('/');
    } catch (error) {
      Swal.fire('Oops!', 'Some error occurred while creating invoice', 'error');
    }
  };

  const goLogin = useCallback((flag) => {
    navigate('/' + path.LOGIN, { state: { flag } })
  }, [navigate])

  useEffect(() => {
    dispatch(actions.getColors())
    dispatch(actions.getImages())
    dispatch(actions.getDimensions())
  }, [dispatch])

  return (
    <div className='payment'>
      <div className='payment_proudct'>
        <CartContext.Consumer>
          {({ cartItems, updateQuantity, removeFromCart }) => {
            const temporary = cartItems.reduce((accumulator, product) =>
              accumulator + (product.price * product.quantity), 0);
            const total = temporary + 40000;
            return (
              <div className='payment_table'>
                <table>
                  <tr className='border-b'>
                    <th>ID</th>
                    <th className='image w-[10%]'>IMAGE</th>
                    <th colSpan={2}>NAME</th>
                    <th>QUANTITY</th>
                    <th>PRICE</th>
                    <th className='w-[25%]'>TOTAL</th>
                  </tr>
                  {cartItems.map((product) => (
                    <>
                      <tr>
                        <td rowSpan={2} className='text-center'>{product.id}</td>
                        <td rowSpan={2} className='image w-[10%]'>
                          {images?.length > 0 && images.map(item => item.idProduct === product.id && item.idColor === product.idColor && (
                            <img src={`/images/${item.image1}`} alt={product.name}
                              className='h-[70%] object-cover' />
                          ))}
                        </td>
                        <td colSpan={2} className='pl-4'>{product.name}</td>
                        <td rowSpan={2} className='text-center'>{product.quantity}</td>
                        <td rowSpan={2} className='text-center'>{product.price.toLocaleString()}</td>
                        <td rowSpan={2} className='text-center text-blue-500'>{(product.price * product.quantity).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>
                          {colors?.length > 0 && colors.map(item => item.id === product.idColor && (
                            <>{item.name}</>
                          ))}
                        </td>
                        <td>
                          {dimensions?.length > 0 && dimensions.map(item => item.id === product.idSize && (
                            <>{item.code}</>
                          ))}
                        </td>
                      </tr>
                      <tr className='border-b border-dashed' ></tr>
                    </>
                  ))}
                </table>
                <div className='temporary-ship-total'>
                  <div className='temporary-ship'>
                    <div className='temporary between'>
                      <p>Temporary</p>
                      <span>{temporary.toLocaleString()}</span>
                    </div>
                    <div className='ship between'>
                      <p>Transport fee</p>
                      <span>{transportFee.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className='total between'>
                    <p>TOTAL</p>
                    <span>{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )
          }}
        </CartContext.Consumer>
      </div>
      <div className='payment_information'>
        <p className='payment_title'>INFORMATION</p>
        <div className='information'>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'NAME'}
            value={payload.name}
            setValue={setPayload}
            keyPayload={'name'}
            type='text'
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'PHONE'}
            value={payload.phone}
            setValue={setPayload}
            keyPayload={'phone'}
            type='tel'
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'EMAIL'}
            value={payload.email}
            setValue={setPayload}
            keyPayload={'email'}
            type='email'
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'ADDRESS'}
            value={payload.address}
            setValue={setPayload}
            keyPayload={'address'}
            type='text'
          />
          <div className='mt-[2%]'>
            <Button
              text='COMPLETE'
              fullWidth
              onClick={() => handleCreateInvoices(cartItems)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment