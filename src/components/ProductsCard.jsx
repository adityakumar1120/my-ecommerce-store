import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function Products({setpopUpCart, item , wishlist , setWishlist , page , setCartData}) {
  const [isTrue , setIsTrue] = useState(false)
  
  const addToWishList = (item)=>{
    setWishlist(prev => {
      const isPresent = prev.some((el) => el.id === item.id)
      if (isPresent){
        return prev.filter((el) => el.id !== item.id)
      }
      else {return [...prev , item]}
    })
    
  }
  const inWishList = (item)=>{
    const result = wishlist.some((e) => e.id === item.id)
    setIsTrue(result)
  }
  useEffect(()=>{
    inWishList(item)
  }, [])
  useEffect(()=>{
    inWishList(item)
  }, [wishlist])

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
          // console.log(item[Object.keys(present[0])] );
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
  const addPopUp = ()=>{
    let id = crypto.randomUUID()
    setpopUpCart(prev => [...prev , {id , message : 'Added To Cart'}])
    setTimeout(()=>{
      setpopUpCart(prev => prev.filter(elem => elem.id !== id))
    }, 1000)
  }
  return (
    <Link  to={`/${item.id}`} state={item} className='flex flex-col justify-between items-center  rounded '>
        <div className='rounded overflow-hidden relative'>
        <div className='bg-[#F5F5F5] '>
          <img src={item.images[0]} alt="" className='w-full  object-contain'/>
          </div>
          <button onClick={e => {
              e.preventDefault() //preventing from changing the page when clicked on link tag
              e.stopPropagation()
              addToCart(item)
              addPopUp()

            }} className={`w-full py-[6px] bg-black  text-white cursor-pointer hover:opacity-[0.8]`}>Add to Cart</button>
      <button
      onClick={e => {
        e.preventDefault()
        addToWishList(item)
      }}
      
      className={`bg-white absolute rounded-full px-2 py-2 top-2.5 right-2.5 cursor-pointer`}>
        {page==='wishlist' ? <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 3.57143H2.33333L3.66667 19H14.3333L15.6667 3.57143H1M9 7.42857V15.1429M12.3333 7.42857L11.6667 15.1429M5.66667 7.42857L6.33333 15.1429M6.33333 3.57143L7 1H11L11.6667 3.57143" stroke="black" strokeWidth="1.56" strokeLinecap="round" strokeLinejoin="round"/>
</svg> :
<svg width="22" height="20" viewBox="0 0 22 20" fill={`${isTrue === true ? '#DD4444' : 'none'}`}
        
        xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z" stroke="black" strokeWidth={`${isTrue === true ? '0' : '1.5'}`} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
}
      </button>
            
        </div>
        <div className='flex flex-col justify-start items-start mt-2.5  w-full'>
            <span>{item.title}</span> 
            <span className='text-[#DB4444] text-[15px]'>$ {item.price}/-</span>
            <span className='text-[15px] flex items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
<path d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110568 7.0691 0.0110563 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z" fill="#FFAD33"/>
</svg>{item?.rating}</span>
            
        </div>
    </Link>
  )
}
