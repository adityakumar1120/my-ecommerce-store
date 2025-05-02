import React from 'react'
import CartCard from '../components/CartCard'
import { NavLink } from 'react-router-dom'
export default function Cart({cartData , setCartData}) {
  let totalVal = 0
  const getTotal = ()=>{
    cartData.map((item)=>{
      totalVal += item[Object.keys(item)[0]].reduce((current , accumulater)=>{
        return current + accumulater.price
      } , 0)
    })
  }
  getTotal()
  console.log(cartData);
  return (
    <div className='px-2 md:px-4 lg:px-6'>
      <div className='ax-w-[1350px] mx-auto'>
        <div className='flex flex-col gap-6 mt-12'>
        <div className='flex justify-between  shadow rounded px-8  py-5'>
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
        </div>
        
        
        {
          cartData.length ? cartData.map((item) =>{
            console.log(Object.keys(item)[0]);
            console.log(item[Object.keys(item)[0]].length);
            return item[Object.keys(item)[0]].length ?  <CartCard
            cartData={cartData} setCartData={setCartData}
            item={item[Object.keys(item)[0]][0]}
            length ={item[Object.keys(item)[0]]?.length}
            key={item[Object.keys(item)[0]][0]?.id} name={item[Object.keys(item)[0]][0]?.title} id={item[Object.keys(item)[0]][0]?.id} price={item[Object.keys(item)[0]][0]?.price} image={item[Object.keys(item)[0]][0]?.images[0]}/>
            : ''
          }) : 'no products in cart'
        }

        </div>
            <NavLink to='/' className='border inline-block mt-4 rounded px-8 py-3 border-[rgba(0,0,0,.5)]'>Return To Shop</NavLink>
            <div className='max-w-[400px] mt-8 mx-auto border-2 py-4 px-4'>
              <p className='text-xl mb-2'>Cart Total</p>
              <p className='flex text-[rgba(0,0,0,.8)] justify-between border-b border-[rgba(0,0,0,.5)] py-2'><span>Subtotal:</span> <span>${totalVal.toFixed(2)}</span></p>
              <p className='flex text-[rgba(0,0,0,.8)] justify-between border-b border-[rgba(0,0,0,.5)] py-2'><span>Shipping:</span> <span>free</span></p>
              <p className='flex text-[rgba(0,0,0,.8)] justify-between py-2'><span>Total:</span> <span>${totalVal.toFixed(2)}</span></p>
              <button className='w-fit mt-4 cursor-pointer mx-auto block bg-[#DD4444] rounded text-white py-2 px-4'>Process to checkout</button>
            </div>
      </div>
    </div>
  )
}

{/* <div className='w-full flex-col flex justify-center items-center pt-[40px] gap-[20px]'>

<div>
  
</div>
{items.cart.length > 0 ? <div className='w-full flex-col flex justify-center items-center gap-[20px]'>
  {items.cart.map((item , i)=>{
  return <CartCard name={item.name} id={item.id} price={item.price} image={item.image} key={i}/>
})}
<div className='flex flex-col items-center justify-center text-2xl'>
  <span>Total Products: {items.cart.length}</span>
  <span>Total Price: {totalVal}</span>
</div>
</div> : <div className='flex justify-center items-center flex-col gap-[20px]'>
  <img src={emptyCart} alt="" className='max-w-[400px] w-full mt-[40px]' />
  <h1 className='text-2xl font-bold'>Empty cart</h1>
</div> }
</div> */}