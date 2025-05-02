import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser, FaShopify, FaUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import {  Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProducts } from '../services/GetServices';
import heart from '../assets/productsAssets/icon.svg'
import cartImg from '../assets/productsAssets/Cart1.svg'
import searchImg from '../assets/productsAssets/search.svg'
import { MdHome } from 'react-icons/md';
import { FaCartShopping } from 'react-icons/fa6';
import { CiUser } from 'react-icons/ci';
export default function Nav({searchData , setSearchData , wishlist , cartData , setCartData}) {
  // const selector = useSelector(state => state)
  const [searchQuery , setSearchQuery] = useState('')
  const [showResults , setShowResults] = useState(false)
  const [clickedElem , setClickedElem]  = useState()
  const navigate = useNavigate()
  const [selectedIndex , setSelectedIndex] = useState(-1)

  const searchProducts = async (searchQuery)=>{
    try{
      if(searchQuery){
        const response = await getProducts(`/search?q=${searchQuery.toLowerCase()}`)
      // console.log(response)
      setSearchData(response.data.products.map((product) => ({...product , isSelected : false})))
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    if(searchQuery){
      let timer = setTimeout(()=>{
        searchProducts(searchQuery)
      }, 300)
      if(searchQuery){
        setShowResults(true)
      } else{
        setShowResults(false)
  
      }
      // console.log(searchData);
      setSelectedIndex(-1) //setting the index to -1 so it will start from the top
      return ()=> clearTimeout(timer)
    }
  }, [searchQuery])

  useEffect(()=>{
    setSearchData(prev => (prev.map((elem , i)=>{
      if(selectedIndex === i){
        return ({...elem , isSelected : true})
      }
      return ({...elem , isSelected : false})
    })))
  } ,[selectedIndex]  )

  const handleOnBlur = (e)=>{
    if(e?.relatedTarget?.parentElement?.classList?.contains('auto-suggestion')) return
    setShowResults(false)
   }
  const handleOnFocus = ()=>{
    setShowResults(true)
    setSelectedIndex(-1)
  }
  const handleChange = (e)=>{setSearchQuery(e.target.value)}
  const handleKeyDown = (e)=>{
    console.log(selectedIndex , searchData.length);
    if(e.key === 'ArrowDown'){
      if(selectedIndex < searchData.length-1){
        setSelectedIndex(prev => prev +1)
      }
    }
    if(e.key === 'ArrowUp'){
      if(selectedIndex > -1){
        setSelectedIndex(prev => prev  - 1)
      }
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
   if(searchQuery === '') return
   if(selectedIndex === -1){
    navigate('/search');
  searchProducts(searchQuery)
  setShowResults(false)
}else{
  navigate(`/${searchData[selectedIndex].id}`)
  searchProducts(searchQuery)
  setShowResults(false)
  }
  }
  return (
    <div className='shadow px-2 md:px-4 lg:px-6'>
      <div className=' flex gap-2 md:gap-0 pt-5 md:pt-7 pb-3 justify-between  items-center max-w-[1350px] mx-auto '>
      <div className="logo md:w-[20%] lg:w-[25%]">
        <h1 className='text-xl md:text-2xl font-bold'>EXCLUSIVE</h1>
      </div>
      <div className='flex items-center md:w-[80%] lg:w-[75%] justify-end md:justify-between '>
      <ul className='md:flex hidden gap-6 lg:gap-12'>
   <NavLink className={({isActive})=>{
            return   `border-b-2 transition-all duration-200 ease-in ${
    isActive ? 'border-[#bbb]' : 'border-transparent'}`
          }} to='/'><li>Home</li></NavLink>

          <NavLink className={({isActive})=>{
            return   `border-b-2 transition-all duration-200 ease-in ${
              isActive ? 'border-[#bbb]' : 'border-transparent'}`
            }} to='/contact'><li>Contact</li></NavLink>
            <NavLink className={({isActive})=>{
              return   `border-b-2 transition-all duration-200 ease-in ${
      isActive ? 'border-[#bbb]' : 'border-transparent'}`
            }} to='/about'><li>About Us</li></NavLink>  
            <NavLink className={({isActive})=>{
              return   `border-b-2 transition-all duration-200 ease-in ${
      isActive ? 'border-[#bbb]' : 'border-transparent'}`
            }} to='/signUp'><li>Sign Up</li></NavLink>
        </ul>
      <div className='flex items-center gap-4 lg:gap-8'>
      <form className='flex relative bg-[#F5F5F5] rounded-[6px] px-[8px] md:px-[10px] lg:px-[16px] '
          onSubmit={handleSubmit}
          >
              <div className=''>
              <input
              onKeyDown={handleKeyDown}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              value={searchQuery}
              onChange={handleChange}
              type="text" placeholder='Search Items' className='py-[4px] md:py-[6px] w-[90%] md:w-[180px] lg:w-auto outline-0'/>
              
              </div>
              <div className={`auto-suggestion left-0 absolute z-10 text-left rounded-2xl bottom-0 bg-white translate-y-[100%]  w-[100%]`}>
              {
                 showResults && searchData.slice(0,5).map((result , i)=>{
                  return <Link 
                  onClick={e => {
                    setShowResults(false)
                    setClickedElem(result)
                  }}
                  to={`/${result.id}`} state={result}>
                  <div key={i} className={`${result.isSelected ? 'bg-[#ddd]' : ''} px-[20px] py-[10px] flex items-center gap-2.5 hover:bg-[#ddd] cursor-pointer`}><IoSearchOutline className='text-lg font-bold'/> { result.title}</div>
                  </Link>
                })
              }
              </div>
              <button
               onClick={() => {
                if(searchQuery === '') return
                navigate('/search');
                setShowResults(false)

              }}
              className='cursor-pointer'><img src={searchImg} alt="" /></button>
          </form>
          <NavLink to='/wishlist' className="cart md:flex hidden relative">
           <img src={heart} alt="" />
           <span className='absolute -top-[9px] -right-[9px] flex items-center justify-center bg-[#DB4444] text-white rounded-full w-[18px] h-[18px] text-[10px]'>{wishlist.length}</span>
           </NavLink>
          <NavLink to='/cart' className="hidden md:block relative">
           <img src={cartImg} alt="" />
           <span className='absolute -top-[5px] -right-[5px] flex items-center justify-center bg-[#DB4444] text-white rounded-full w-[18px] h-[18px] text-[10px]'>{cartData.length}</span>
           </NavLink>
      </div>
      </div>
    </div>

{/* bottom nav */}
    <div className='md:hidden h-[50px] sm:h-[60px] flex fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-10'>
    <ul className='px-4 max-w-[500px] mx-auto flex items-center justify-between w-full '>
   <NavLink to='/'>
          {({isActive})=>(<li>
            <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="30px" viewBox="0 0 16 16" fill="none" stroke="black" strokeWidth="1.5">
<path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill={`${isActive ? 'black' : 'none'}`}/>
</svg>
          </li>)}
          </NavLink>

          <NavLink to='/signUp'>{({isActive})=>(<li><svg xmlns="http://www.w3.org/2000/svg" width="26px" height="30px" viewBox="0 0 16 16" fill="black" strokeWidth="1.5" stroke="black">
<path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill={`${isActive ? 'black' : 'none'}`}/>
<path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill={`${isActive ? 'black' : 'none'}`}/>
</svg></li>)}</NavLink>  

          <NavLink  to='/wishlist'>
          {({isActive})=>(
            <li><svg width="26" height="30" viewBox="0 0 22 20" fill={`${isActive ? 'black' : 'none'}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </li>
          )}
          </NavLink>

          <NavLink to='/cart'>{({isActive})=>(<li ><svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 512 512" height="30" width="30" xmlns="http://www.w3.org/2000/svg" className="text-black"><circle cx="176" cy="416" r="16" fill={`${isActive ? 'black' : 'none'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle><circle cx="400" cy="416" r="16" fill={`${isActive ? 'black' : 'none'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle><path fill={`${isActive ? 'black' : 'none'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M48 80h64l48 272h256"></path><path fill={`${isActive ? 'black' : 'none'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M160 288h249.44a8 8 0 0 0 7.85-6.43l28.8-144a8 8 0 0 0-7.85-9.57H128"></path></svg>

</li>)}
</NavLink>
        </ul>
    </div>
    </div>
  )
}

// (
//   <div className='w-full h-[150px] shadow-[0_4px_10px_rgba(0,0,0,0.5)]'>
//       <div className="top-nav relative w-full h-[75%] bg-[rgb(25,29,33)] flex justify-between items-center px-[30px] py-[10px]">
//           <NavLink>
//           <div className="logo flex items-center justify-center gap-2 text-white text-xl">
//               <span>A-shop</span><FaShopify />
//           </div>
//           </NavLink>
//           <form className='relative rounded-2xl bg-white w-[60%] h-[60%] hidden md:flex items-center justify-center'
//           onSubmit={handleSubmit}
//           >
//               <div className='w-[70%] '>
//               <input
//               onKeyDown={handleKeyDown}
//               onFocus={handleOnFocus}
//               onBlur={handleOnBlur}
//               value={searchQuery}
//               onChange={handleChange}
//               type="text" placeholder='Search Items' className='w-[100%] h-full px-[20px] py-[10px] outline-0'/>
              
//               </div>
//               <div className={`auto-suggestion absolute z-10 text-left rounded-2xl bottom-0 bg-white translate-y-[100%] max-h-[500px] overflow-y-auto w-[100%]`}>
//               {
//                  showResults && searchData.map((result , i)=>{
//                   return <Link 
//                   onClick={e => {
//                     setShowResults(false)
//                     setClickedElem(result)
//                   }}
//                   to={`/${result.id}`} state={result}>
//                   <div key={i} className={`${result.isSelected ? 'bg-[#ddd]' : ''} px-[20px] py-[10px] flex items-center gap-2.5 hover:bg-[#ddd] cursor-pointer`}><IoSearchOutline className='text-lg font-bold'/> { result.title}</div>
//                   </Link>
//                 })
//               }
//               </div>
//               <button
//                onClick={() => {
//                 navigate('/search');
//                 setShowResults(false)

//               }}
//               className='w-[30%] h-full flex items-center justify-end text-3xl font-bold pr-[20px]'><IoSearchOutline /></button>
//           </form>
//         <NavLink to='/cart'>
//         <div className="cart flex text-white relative">
//           <IoCartOutline className='h-[40px] w-[40px] text-white text-2xl'/>
//           <span className='absolute -right-[2px] -top-[12px]'>{selector.cart.length}</span>
//           </div>
//         </NavLink>
//         {/* {showResults && <div
//         onClick={e => setShowResults(false)}
//         className='absolute text-left h-[100vh] left-0 right-0 rounded-2xl bottom-7  translate-y-[100%]  w-[100%]'>

//         </div>} */}
//       </div>
//       <div className="bottom-nav w-full h-[25%] bg-[rgb(38,45,51)] flex items-center justify-center">
//         <ul className='flex gap-[20px] text-white'>
//           <NavLink className={({isActive})=>{
//             if(isActive) return 'underline'
//           }} to='/'><li>Home</li></NavLink>
//           <NavLink className={({isActive})=>{
//             if(isActive) return 'underline'
//           }} to='/shop'><li>Shop</li></NavLink>  
//           <NavLink className={({isActive})=>{
//             if(isActive) return 'underline'
//           }} to='/cart'><li>Cart</li></NavLink>
//           <NavLink className={({isActive})=>{
//             if(isActive) return 'underline'
//           }} to='/contact'><li>Contact</li></NavLink>
//         </ul>
//       </div>
//   </div>
// )