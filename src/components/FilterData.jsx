import React, { useState } from 'react'

export default function FilterData({sortBy , setSortBy,sortByPrice , setSortByPrice}) {
   
    const handleClick = (elem , setData) =>{
        setData(prev => prev.map((item , i) =>{
            if(elem.id === i){
                return ({...elem , isSelected : !elem.isSelected})
            }
            else{
                return ({...item , isSelected : false})
            }
        }))
    }
  return (
    <div className='flex gap-2 justify-center items-center w-full flex-wrap p-[30px]'>
        
        {sortBy.map((elem , i)=>{
            return <div
            key={i}
            onClick={e => handleClick(elem , setSortBy)}
            className={`${elem.isSelected === true ? 'bg-[#000] text-white ' : 'bg-[#e5e7eb]'} text-lg rounded px-3 py-2 capitalize cursor-pointer`}>{elem.val}</div> 
        })}
        {sortByPrice.map((elem , i) =>{
            return <div
            key={i}
            onClick={e => handleClick(elem , setSortByPrice)}
            className={`${elem.isSelected === true ? 'bg-[#000] text-white' : 'bg-[#e5e7eb]'} text-lg  rounded px-3 py-2 cursor-pointer`}>{elem.val ? `$${elem.val[0]} - $${elem.val[1]}` : 'All'}</div>
        })}
    </div>
  )
}
