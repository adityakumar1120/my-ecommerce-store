import React from 'react'
import Products from '../components/ProductsCard'
import { Link } from 'react-router-dom'

export default function WishList({wishlist , setWishlist}) {
  return (
    <div className='px-2 md:px-4 lg:px-6'>
        <div className='max-w-[1350px] mx-auto'>
        <div className='flex justify-between items-center py-12 '>
            <p>Wishlist({wishlist.length})</p>
            <Link to='/' className='border rounded px-8 py-3 border-[rgba(0,0,0,.5)]'>Return to Shop</Link>
        </div>
        <div className="products-section grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-8 w-full  p-[15px] md:p-[30px]">
            {wishlist.length ?
            wishlist.map((item , i) => (<Products key={i} page={'wishlist'} item={item} wishlist={wishlist} setWishlist={setWishlist} />))
            : <p className='text-center w-full'>No products in Wishlist</p>
        }
        </div>
    </div>
    </div>
  )
}
