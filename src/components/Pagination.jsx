import React, { useEffect } from 'react'
import { GrFormPrevious, GrPrevious } from 'react-icons/gr'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { getProducts } from '../services/getServices'

export default function Pagination({setCurrentPage,currentPage , noOfPages}) {
    const handlePageChange = (n)=>{
        console.log(currentPage , n);
        setCurrentPage(n)
    }
    const goToPreviousPage = ()=>{
        if(currentPage === 0){
            return
        } else{
            setCurrentPage(prev => prev - 1)
        }
    }
    const goToNextPage = ()=>{
        if(currentPage === noOfPages-1){
            return
        } else{
            setCurrentPage(prev => prev + 1)
        }
    }
  return (
    <div className='flex items-center justify-between max-w-[90%] mx-auto
    '>
        <button
onClick={e => goToPreviousPage()}
> <GrFormPrevious  className={`${currentPage === 0 ? 'text-[#ddd]' : ''} text-xl shadow-[2px_2px_4px_rgba(0,0,0,.7)] rounded cursor-pointer h-[40px] w-[40px]`}/></button>
        {[...Array(noOfPages).keys()].map((n)=>{
            return <span 
            onClick={e => handlePageChange(n)}
            className={`${currentPage == n ? 'bg-black text-white' : ''} text-lg shadow-[2px_2px_4px_rgba(0,0,0,.7)] rounded cursor-pointer h-[40px] w-[40px] grid place-items-center transition-all`} key={n}>{n}</span>
        })}
        <button
onClick={e => goToNextPage()}
> <IoChevronForwardSharp className={`${currentPage === noOfPages-1 ? 'text-[#ddd]' : ''} shadow-[2px_2px_4px_rgba(0,0,0,.7)] rounded cursor-pointer h-[40px] w-[40px]`}/> </button>
    </div>
  )
}

