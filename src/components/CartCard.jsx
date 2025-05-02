import React, { useEffect } from 'react'
import arrow from '../assets/productsAssets/arrow.svg'
import { Link } from 'react-router-dom'


export default function  CartCard({item ,name , image , price , id , length, cartData , setCartData}) {
  const addToCart = (e)=>{
    setCartData(prev => {
      //jo element pass hua hai vo hai ya nhi aur hai toh konsa elem hai isliye filter kiys hai some nhi
    const present =   prev.filter((el) => {
        return Object.keys(el)[0] === e.title
        // console.log(Object.keys(el)[0]);
      })
      // console.log(Object.keys(present[0])[0]);
      if(present.length){
        //agar hai toh uspe map karo aur uski name ki property ke array mein ek aur elem add kardo
        return prev.map((item)=>{
          console.log(item[Object.keys(present[0])] );
          if(item[Object.keys(present[0])[0]]){
            return ({[Object.keys(present[0])[0]] : [...item[Object.keys(present[0])[0]] , e]})
          } else{
            // nhi hai to sidhe return kardo 
            return item
          }
          // console.log(item['Powder Canister']);
        })
      }
      // agar nhi hai toh set kardo
      return [...prev , {[e.title] : [e]} ]
    })
  }
  const RemoveFromCart = (e)=>{
    setCartData(prev =>{
      const present =   prev.filter((el) => {
        return Object.keys(el)[0] === e.title
        // console.log(Object.keys(el)[0]);
      })
      if(present.length){
        return prev.filter((item)=>{
          if(item[Object.keys(present[0])[0]]){
            item[Object.keys(present[0])].pop()
            
            if(item[Object.keys(present[0])].length){
              return {[Object.keys(present[0])[0]] : item[Object.keys(present[0])]}
            } else {
              return false
            }
          } else{
            return item
          }
        })
      }
      return prev
    })
  }
  useEffect(()=>{
    console.log('render');
  }, [cartData])
  return (
    <div className='grid grid-cols-3 items-center shadow rounded px-8  py-3'>
          <Link to={`/${item.id}`} className='flex items-center gap-4'>
            <div className='w-[50px]'><img src={image} alt="" /></div>
            <p>{name}</p>
          </Link>
          <p className='justify-self-center'>${price}</p>

          <div className='flex justify-self-end w-fit items-center gap-3 border px-4 rounded py-1 border-[rgba(0,0,0,.5)]'>
            <span>{length}</span> 
          <div className='gap-1 flex flex-col'>
            <span className='cursor-pointer'
            onClick={e => addToCart(item)}
            ><img src={arrow} alt="" /></span>
            <span className='cursor-pointer'
            onClick={e => RemoveFromCart(item)}
            ><img className='rotate-180' src={arrow} alt="" /></span>
            </div>
            </div>
        </div>
  )
}
