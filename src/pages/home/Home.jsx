import React, { use, useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import Products from '../../components/ProductsCard'
import FilterData from '../../components/FilterData'
import { getProducts } from '../../services/getServices'
import Spinner from '../../components/Spinner'
import Pagination from '../../components/Pagination'
import Hero from '../../components/Hero'
export default function Home({sortByPrice , setSortByPrice,
  sortBy , setSortBy,data , setData ,wishlist , setWishlist ,
  cartData , setCartData , setpopUpCart , categories , setCategories
 
}) {
  const [currentPage , setCurrentPage] = useState(0)
  const [error , setError] = useState({
    products : null,
    categories : null,
  })
  const [isLoading, setIsLoading] = useState({
    products : JSON.parse(localStorage.getItem('data')) ? false : true,
    categories :JSON.parse(localStorage.getItem('categories')) ? false :  true,
  })
  const [query , setQuery] = useState('')

// console.log(data);
const [selectedFilter] = sortByPrice.filter((sort)=> sort.isSelected) //getting the element on which the user clicks to filter
const [selectedFilterForOrder] = sortBy.filter((sort)=> sort.isSelected) //getting the element on which the user clicks to filter
console.log(data);

const PAGE_SIZE = 20
const noOfPages = Math.ceil(data.length/PAGE_SIZE)
const start = currentPage * PAGE_SIZE;
const end = start + PAGE_SIZE;
async function getData(path){
  try{
    const response = await getProducts(path)  
      setData(response.data.products)
   
    setIsLoading(false)
  } catch(err){
      setError(prev => ({...prev , products : 'failed to get the products'}))
    
  }finally{
      setIsLoading(prev => ({...prev , products : false}))
  }
  }
async function getCategories(path){
  try{
    const response = await getProducts(path)  
   setCategories([{name : 'All' , slug: '/?limit=194'} , ...response.data])
    setIsLoading(false)
  } catch(err){
      setError(prev => ({...prev , categories : 'failed to get the categories'}))
  }finally{
      setIsLoading(prev => ({...prev , categories : false}))
  }
  }


  useEffect(()=>{
  if(data.length <= 0){
    getData('/?limit=194')
  }
  if(categories.length <= 0){
    getCategories('/categories')
  }
} , [])
const getCategoryData = async (query)=>{
  try{
    const response = await getProducts(`/category/${query}`)
    console.log(response);
    setData(response.data.products)
  }catch(err){
    console.log(err);
  }
}

useEffect(()=>{
  if(query){
    if(query === '/?limit=194'){
      getData(query)
    } else {
      getData(`/category/${query}`)
    }
  }
}, [query])
  return (
    <div className='min-h-[100vh]'>
        <Hero setQuery={setQuery} setCurrentPage={setCurrentPage} error={error} categories={categories} isLoading={isLoading}/>
       
          <h1 className='text-3xl p-[40px] font-bold text-center'>Trending Products</h1>
          <FilterData sortBy={sortBy} setSortBy={setSortBy} sortByPrice={sortByPrice} setSortByPrice={setSortByPrice}/>

          <div className="products-section grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-8 w-full  p-[15px] md:p-[30px]">
          {
            isLoading.products ? <Spinner/> : error.products ? error.products
            :  data.slice(start, end).filter((item) => {
              if(selectedFilter && selectedFilter.val) return item.price >= selectedFilter?.val[0] && item.price <= selectedFilter?.val[1]
              return item
            } ).sort((a,b)=>{
              if(!selectedFilterForOrder) return 0
              return selectedFilterForOrder?.val === 'ascending' ? a.price - b.price : b.price - a.price
            }).map((product,i)=>{

              return <Products setpopUpCart={setpopUpCart} cartData={cartData} setCartData={setCartData} page={'home'} wishlist={wishlist} setWishlist={setWishlist} item={product} key={product.id}
              id={product.id}
              name={product.title} image={product.images} price={product.price} category={product.category}/>
            })
          }
        </div>
        <Pagination
        noOfPages={noOfPages}
        PAGE_SIZE={PAGE_SIZE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
/>
    </div>
  )
}
