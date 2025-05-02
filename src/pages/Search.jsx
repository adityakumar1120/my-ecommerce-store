import React from 'react'
import FilterData from '../components/FilterData'
import Spinner from '../components/Spinner'
import Products from '../components/ProductsCard'

export default function Search({searchData , wishlist , setWishlist , setCartData , setpopUpCart
}) {
  return (
    <div>
        <h1 className='text-3xl py-[30px] px-[40px] font-bold'>Search Products</h1>
                  {/* <FilterData sortBy={sortBy} setSortBy={setSortBy} sortByPrice={sortByPrice} setSortByPrice={setSortByPrice}/> */}
        
                  <div className="products-section grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  w-full gap-8  p-[15px] md:p-[30px]">
                  {
                    searchData.length ?
                     searchData.map((product,i)=>{
                      return <Products setpopUpCart={setpopUpCart} setCartData={setCartData} item={product} key={product.id} wishlist={wishlist} setWishlist={setWishlist} category={product.category}/>
                    })
                    : 'no products found'
                  }
                </div>
    </div>
  )
}
