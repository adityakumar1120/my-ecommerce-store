import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getProducts } from '../services/GetServices'
import heart from '../assets/productsAssets/icon.svg'
import removeIcon from '../assets/productsAssets/icon-minus.svg'
import addIcon from '../assets/productsAssets/icon-plus.svg'
import freeDelivery from '../assets/productsAssets/free-delivery.svg'
export default function Products({data , setData , wishlist , setWishlist , cartData , setCartData}) {
  const {state} = useLocation()
  const id = parseInt(useParams().products)
  const [product , setProduct] = useState()
    const [isTrue , setIsTrue] = useState(false)
  console.log(Math.floor(product?.rating));
  const getSingleProduct = async ()=>{
    try{
      const res = await getProducts(`/${id}`)
      setProduct(res.data)
    }
    catch(err){
      console.log(err);
    }finally{
      console.log('loading false');

    }
  }
  useEffect(()=>{
    if(data.length) {
     
      setProduct(data.filter((item)=>{
        return item.id === id
      })[0])
    }else{
      getSingleProduct()
    }
  },[])
  useEffect(()=>{
    console.log(data);
    if(data.length){
      setProduct(data.filter((item)=>{
        return item.id === id
      })[0])
    }else{
      getSingleProduct()
    }
  }, [id])
  const addToWishList = (item)=>{
    // console.log('added');
    console.log(item.title);
    setWishlist(prev => {
      const isPresent = prev.some((el) => el.id === item.id)
      console.log(isPresent);
      if (isPresent){
        return prev.filter((el) => el.id !== item.id)
      }
      else {return [...prev , item]}
    }) 
  }
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
        return prev.map((item)=>{
          if(item[Object.keys(present[0])[0]]){
            item[Object.keys(present[0])].pop()
            return {[Object.keys(present[0])[0]] : item[Object.keys(present[0])]}
          } else{
            return item
          }
        })
      }
      return prev
    })
  }
  const inWishList = (item)=>{
    console.log(item);
      const result = wishlist.some((e) => e.id === item.id)
      setIsTrue(result)
    }
    useEffect(()=>{
      if(product !== undefined){
        inWishList(product)
      }
    }, [product])
    useEffect(()=>{
      if(product !== undefined){
          inWishList(product)
        }
    }, [wishlist])
  return product && (
    <div className='max-w-[1250px] mx-auto flex gap-2.5 justify-around px-6 md:px-8 py-4  md:py-10 flex-col md:flex-row'>
      <div className='w-[100%] md:w-[40%] h-[350px] md:h-full bg-slate-100 rounded'>
        <img className='w-full h-full object-contain' src={product?.images[0]} alt="" />
      </div>
      {/* info */}
      <div className='w-full md:w-[45%]'>
      <div className='flex flex-col gap-2 pt-4'>
      <h1 className='text-2xl font-semibold'>{product?.title}</h1>
        <div className='flex '>
          <div className='flex text-sm'>
            {[...Array(Math.floor(product?.rating)).keys()].map((rate , i) => (<svg key={i} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.25" d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z" fill="blue"/>
</svg>))}
          </div>
          <p className='text-sm opacity-50'>({product?.reviews.length} Reviews)</p>
        </div>
        <p className='text-2xl '>${product.price}</p>
        <p className='md:text-base text-sm border-b-1 pb-5 md:leading-6 md:mt-2'>{product?.description}</p>

      </div>
      <div className='flex py-4 gap-2 md:gap-4'>
        <div className='border border-[rgba(0,0,0,0.51)] flex overflow-hidden rounded'>
          <button 
          onClick={e => RemoveFromCart(product)}
          className='border-r border-[rgba(0,0,0,0.51)] px-2 cursor-pointer'><img src={removeIcon} alt="" /></button>
          <span className='flex items-center px-4 md:px-8 text-xl py-1.5'>{cartData.map(elem =>{
            return elem[product.title] ? elem[product.title].length : ''
          }).filter((elem)=> elem !== '').length ? cartData.map(elem =>{
            return elem[product.title] ? elem[product.title].length : ''
          }) : 0}</span>
          <button 
          onClick={e => addToCart(product)}
          className='bg-[#DB4444] border-l border-[rgba(0,0,0,0.51)] px-2 cursor-pointer'><img src={addIcon} alt="" /></button>
        </div>
        <button className='bg-[#DB4444] rounded text-white px-4 text-sm md:text-base md:px-10 cursor-pointer'>Buy Now</button>
        <button 
        onClick={e => {
          addToWishList(product)
        }}
        className='border border-[rgba(0,0,0,0.51)] rounded px-2 cursor-pointer'><svg width="22" height="20" viewBox="0 0 22 20" fill={`${isTrue === true ? '#DD4444' : 'none'}`}
        
        xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z" stroke="black" stroke-width={`${isTrue === true ? '0' : '1.5'}`} stroke-linecap="round" stroke-linejoin="round"/>
      </svg></button>
      </div>
      <div className='border rounded overflow-hidden mt-2'>
        <div className='flex pt-4 md:pt-6 pb-2.5 md:pb-4 px-4 md:px-8 gap-4 md:gap-7 border-b'>
          <img src={freeDelivery} alt="" />
          <div>
            <p className='text-base font-bold'>Free Delivery</p>
            <p className='text-sm underline mt-2'>Enter your postal code for Delivery Availability</p>
          </div>
        </div>
        <div className='flex pt-4 md:pt-6 pb-2.5 md:pb-4 px-4 md:px-8 gap-4 md:gap-7 '>
          <img src={freeDelivery} alt="" />
          <div>
            <p className='text-base font-bold'>Return Delivery</p>
            <p className='text-sm underline mt-2'>Free 30 Days Delivery Returns. Details</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
