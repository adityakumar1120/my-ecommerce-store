import React from 'react'

export default function CategoryCard({setQuery , setCurrentPage , item}) {
  return (
    <div
            onClick={e => {
              setCurrentPage(0)
              setQuery(item.slug)}}
            className={`  capitalize py-2 text-base cursor-pointer hover:text-[#DB4444] transition-all duration-100`}>{item.name}</div>
  )
}

// <div
            // onClick={()=> setQuery(item.name)}
              // className='flex flex-col justify-center items-center gap-[10px] w-[200px] h-[250px] px-[10px] rounded cursor-pointer hover:scale-105 hover:shadow-[2px_2px_10px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out'>
              {/* <img src={item.image} alt="" className='h-[70%] w-full'/>
              <span className='mt-[10px]'>{item.name}</span> */}
              
              
            // </div>