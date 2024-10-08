'use Client'
import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { addToCart , removeProduct , Addone , removeOne , loadCart} from '@/redux/CartSlice'
import Image from 'next/image'
import CheckoutButton from './checkoutbtn'
import {FaTrash , FaTimes} from 'react-icons/fa'
import { useEffect } from 'react'
import Link from 'next/link'
const Shoppingcart = () =>{
  const cart = useSelector((state:any) => state.cart);
   const dispatch = useDispatch();
    const handleAddOne = (product:any) => { dispatch(Addone(product)); }; 
    const handleRemoveOne = (product:any) => { dispatch(removeOne(product)); }; 
    const handleRemoveFromCart = (product:any) => { dispatch(removeProduct(product)); };
     const handleaddtoCart = (product:any)=>{ dispatch(addToCart(product)); }
    //  useEffect(() => {
    //   if (typeof window !== 'undefined') {
    //     const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartItems') || '{}');
    //     if (cartFromLocalStorage.cartItems) {
    //       dispatch(loadCart(cartFromLocalStorage));
    //     }
    //   }
    // }, [dispatch]);
  
    // // Save cart to local storage whenever cart items change
    // useEffect(() => {
    //   if (typeof window !== 'undefined' && cart.cartItems.length > 0) {
    //     localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
    //   }
    // }, [cart.cartItems]);
   
    //  const cartfromlocal : any= JSON.parse(localStorage.getItem("cart") || "[]")
    //  console.log(cartfromlocal)
    
      
     return (
      <div className='flex w-full min-h-screen  flex-col flex-grow'>
        <div className='heading w-full m-2 p-6 '><p className='textt-xl md:text-2xl font-semibold'>YOUR CART</p></div>
        <div className='flex w-full  flex-grow'>
          {cart.cartItems.length === 0 ? (
            <div className='flex  justify-center items-center w-full flex-col'>
              <p className='text-xl md:text-2xl  mb-2  '>No Items in the Cart</p>
              <Link href='/shop'><button className='bg-black p-2 font-semibold border border-black text-white hover:bg-gray-600 rounded-lg shadow-xl '>Continue Shopping</button></Link>
            </div>
            
          ):(
            <div className='flex w-full min-h-screen  md:flex-row flex-col flex-grow'>
              <div className='cart_container p-2 m-2 md:w-[70%] w-auto '>
                <table className=' w-full table-auto shadow-lg rounded-lg '>
                  <thead className='  m-4 p-4 rounded-lg  '>
                    <tr className=' bg-gray-100 p-4 shadow-xl mb-4 rounded-lg '>
                      <th className=' flex justify-start items-start mx-2 p-4'>ITEM</th>
                      <th className=''>PRICE</th>
                      <th className='hidden md:table-cell'>QUANTITY</th>
                      <th className='hidden md:table-cell'>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className='rounded-lg'>
                    {cart.cartItems.map((item: any) => (
                      <tr key={item._id} className='p-6 m-4 bg-white rounded-md shadow-md'>
                        <td className=' p-4 rounded-md'>
                          <div className='flex items-center space-x-3 justify-start'>
                            <div className='avatar'>
                              <div className='mask mask-squircle w-12 h-12'>
                                <Image
                                  src={item.ImageUrl}
                                  alt={item.title}
                                  width={150}
                                  height={150}
                                  className="rounded-md"
                                />
                              </div>
                            </div>
                            <div>
                              <div className='font-bold'>{item.title}</div>
                              <div className='border  flex px-1 py-1 md:hidden w-[70%] justify-between items-center'>
                            <button
                              onClick={() => handleAddOne(item)}
                              className='mx-1  '
                            >
                              +
                            </button>
                            <p className='text-gray-600 mx-1'>{item.quantity}</p>
                            <button
                              onClick={() => handleRemoveOne(item)}
                              className=' mx-1 '
                            >
                              -
                            </button>
                            </div>
                            </div>
                            <button
                            onClick={() => handleRemoveFromCart(item)}
                            className=' px-3 py-1 rounded-md mx-2 md:hidden'
                          >
                            <FaTimes className=''/>
                          </button>
                          </div>
                        </td>
                        <td className=' p-4 rounded-md'><div className='flex justify-center items-start md:items-center text-sm md:text-lg font-bold'>
                          ${item.price}

                          </div></td>
                        <td className=' hidden md:block'>
                          <div className='flex items-center  justify-center'>
                            <div className='border  flex px-2 py-2 mt-4'>
                            <button
                              onClick={() => handleAddOne(item)}
                              className='mx-1  '
                            >
                              +
                            </button>
                            <p className='text-gray-600 mx-1'>{item.quantity}</p>
                            <button
                              onClick={() => handleRemoveOne(item)}
                              className=' mx-1 '
                            >
                              -
                            </button>
                            </div>
                          </div>
                        </td>
                        <td className='hidden md:table-cell '>
                          <div className='flex justify-between items-center'>
                            <p className='mx-2'>${item.price * item.quantity}</p>
                          <button
                            onClick={() => handleRemoveFromCart(item)}
                            className=' px-3 py-1 rounded-md mx-2'
                          >
                            <FaTimes className=''/>
                          </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                                  
                          

                </table>
              </div>
              <div className='order_container p-2 m-2 md:[40%] w-full lg:w-[30%] flex flex-col h-auto   '>
                <div className='bg-white rounded-lg border border-white shadow-lg flex justify-center items-center flex-col'>
                <div className='flex  m-2 p-2 w-full  rounded-lg'>
                  <p className='font-semibold text-xl md:text-2xl'>Order Summary</p>
                </div>
                <div className='flex  m-2 p-2 w-[80%]  justify-between items-center'>
                 <p className=' text-sm md:text-md'>Subtotal </p> <p className='font-bold text-sm md:text-md ml-4'>${cart.totalAmount.toFixed(2)}</p>
                </div>
                <div className='flex  m-2 p-2 w-[80%]  justify-between items-center'>
                  <p className=' text-sm md:text-md'>Quantity</p> <p className='font-bold text-sm md:text-md'>{cart.totalQuantity}</p>
                </div>
                <div className='flex  m-2 p-2 w-[80%] justify-between items-center '>
                  <p className=' text-sm md:text-md'>Total</p> <p className='font-bold text-sm md:text-md'>${cart.totalAmount.toFixed(2)}</p>
                </div>
                <div className='w-[90%] border  '></div>
                <div className='w-[80%]  m-2 '>
                  <p className='text-[10px] text-gray-500'>Tax and Shipping calculated at Checkout</p>
                </div>
                <div className='flex  m-2 p-2 w-[80%] md:w-[60%]  justify-center items-center'>
                  {/* <button className='bg-white p-2 w-[80%] border-2 border-black rounded-lg shadow-xl hover:underline text-sm md:text-md'>Proceed to Checkout</button> */}
                 <CheckoutButton></CheckoutButton>
                </div>
                
                <div className='flex  m-2 p-2 w-full md:w-[70%] justify-center items-center'>
                  
                  <button className='bg-white text-black p-2 w-[80%] border-2 border-black rounded-lg shadow-xl hover:underline text-sm md:text-md'><Link href='/shop'>Continue Shopping</Link></button>
                </div>
              </div>
              </div>
              
           </div>

          )}
          
        </div>
      </div>
    
     )
}
export default Shoppingcart;