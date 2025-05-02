import React, { useEffect, useState } from 'react'
import bg from '../assets/productsAssets/hero-img.png'
import appleLogo from '../assets/productsAssets/appleLogo.png'
import rightArrow from '../assets/productsAssets/right-arrow.svg'
import Spinner from './Spinner'
import CategoryCard from './CategoryCard'
import { Link } from 'react-router-dom'

export default function Hero({isLoading , error , setQuery , setCurrentPage , categories}) {
  const [windowSize , setWindowSize] = useState('')
  useEffect(()=>{
    window.addEventListener('resize' ,(e)=>{
      // console.log(e.target.innerWidth);
    })
  },[])
  return (
    <div className=' md:px-4 lg:px-6 '>
        <div className="flex max-w-[1350px] mx-auto " 
        // style={{ height: 'calc(75vh - 76px)' }}
        >
            <div className='md:flex hidden justify-between  flex-col overflow-hidden w-[17%] border-r border-[#ddd] pt-2'>
                      {
                        isLoading.categories ? <Spinner/> : error.categories ? error.categories :
                         categories.slice(0,8).map((item,i) => (<CategoryCard setQuery={setQuery} setCurrentPage={setCurrentPage} item={item} key={i}/>))
                      }
                      </div>
        <div className='md:pt-10 md:pl-10 w-full h-full'>
        <div className='w-full p-0 pb-4 pt-4 h-full  bg-black text-white flex md:flex-row flex-col-reverse justify-end  md:justify-between'>
        <div className='flex flex-col  gap-3 md:gap-5  md:w-auto w-fit md:m-0 mx-auto md:pl-12 pt-6 md:pt-12'> 
        <div className='flex items-center gap-4 '>
          <img src={appleLogo} alt="" className=' w-8'/>
          <p >iPhone 14 Series</p>
          </div>
        <h1 className='text-3xl md:text-4xl lg:text-5xl leading-9 md:leading-14 font-[500] max-w-[200px] md:max-w-[280px]'>Up to 10% off Voucher</h1>
        <Link className='flex group'> <span className='border-b w-fit pb-[1px]'>shop Now</span> <img className='ml-2 group-hover:ml-4 transition-all duration-300 ease-out' src={rightArrow} alt="" /></Link>
        </div>
        <div className='flex shrink-0 mx-auto justify-center md:p-0 pt-10 min-h-[200px] max-h-[400px] max-w-[400px] lg:max-w-[450px]'>
            <img className='object-cover w-full' src={bg} alt="" />
        </div>
        </div>
        </div>
        </div>
    </div>
  )
}
