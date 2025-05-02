import React, { useState } from 'react'
import { category } from '../category'
import { dummydata } from '../dummydata'
import Products from '../components/ProductsCard'
import { FaShopify } from 'react-icons/fa'

export default function Shop() {
    const [query , setQuery] = useState('')
    console.log(query);
  return (
    <div>
        <div className='flex justify-center items-center text-[4vmax] gap-2.5 h-[120px] w-full'>
            <span>Shop</span>
            <FaShopify />
        </div>
      <div className='flex justify-center items-center mt-[30px] w-full gap-[20px] flex-wrap px-[10px]'>
              {category.map((item,i) =>{
                return <div
                onClick={()=> setQuery(item.name === 'All' ? '' : item.name)}
                 key={i} className='flex flex-col justify-center items-center gap-[10px] w-[200px] h-[250px] px-[10px] rounded cursor-pointer hover:scale-105 hover:shadow-[2px_2px_10px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out'>
                    <img src={item.image} alt="" className='h-[70%] w-full'/>
                  <span className='mt-[10px]'>{item.name}</span>
                </div>
              })}

            </div>
            <h1 className='text-3xl p-[40px] font-bold text-center'>Trending Products</h1>
                    <div className="products-section flex justify-center items-center w-full gap-[30px] flex-wrap p-[30px]">
                      {dummydata.filter((item) => item.category.includes(query)).map((product)=>(
                        <Products key={product.id}
                        id={product.id}
                        name={product.name} image={product.image} price={product.price} category={product.category}/>
                      ))}
                    </div>
    </div>
  )
}
