import React, { use, useEffect, useState } from 'react'
import Products from '../../components/ProductsCard'
import FilterData from '../../components/FilterData'
import { getProducts } from '../../services/GetServices'
import Spinner from '../../components/Spinner'
import Pagination from '../../components/Pagination'
import Hero from '../../components/Hero'
import { useParams } from 'react-router-dom'
export default function Category({sortByPrice , setSortByPrice,
  sortBy , setSortBy,data , setData ,wishlist , setWishlist ,
  cartData , setCartData , setpopUpCart , categories , setCategories,
  categoriesData , setCategoriesData
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
const params = useParams().categoryId
console.log(params);

const PAGE_SIZE = 20
const noOfPages = Math.ceil(categoriesData.length/PAGE_SIZE)
const start = currentPage * PAGE_SIZE;
const end = start + PAGE_SIZE;

async function getCategories(path){
  try{
    const response = await getProducts(path)  
   setCategories([ ...response.data])
    setIsLoading(false)
  } catch(err){
      setError(prev => ({...prev , categories : 'failed to get the categories'}))
  }finally{
      setIsLoading(prev => ({...prev , categories : false}))
  }
  }


  useEffect(()=>{
  
  if(categories.length <= 0){
    getCategories('/categories')
  }
} , [])

const getCategoryData = async (path)=>{
  try{
    const response = await getProducts(path)
    console.log(response.data.products);
    setCategoriesData([...response.data.products])
  }catch(err){
    console.log(err);
  }
}
useEffect(()=>{
    console.log(params);
    getCategoryData(`/category/${params}`)
} , [])
useEffect(()=>{
  if(query){
    if(query === '/?limit=194'){
      getData(query)
    } else {
      if(query){
        getCategoryData(`/category/${query}`)
      }
    }
  }
}, [query])
  return (
    <div className='min-h-[100vh]'>
        <Hero setQuery={setQuery} setCurrentPage={setCurrentPage} error={error} categories={categories} isLoading={isLoading}/>
       
          <h1 className='text-3xl p-[40px] font-bold text-center'>{params.split('-').map((el , i)=>{
            return el.split('').map((el, i) => i === 0 ? el.toUpperCase() : el).join('')
          }).join(' ')}</h1>
          <FilterData sortBy={sortBy} setSortBy={setSortBy} sortByPrice={sortByPrice} setSortByPrice={setSortByPrice}/>

          <div className="products-section grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-8 w-full  p-[15px] md:p-[30px]">
          
          {
            categoriesData.length ?  categoriesData.map((product,i)=>{
                console.log(categoriesData.length);
                return <Products setpopUpCart={setpopUpCart} cartData={cartData} setCartData={setCartData} page={'home'} wishlist={wishlist} setWishlist={setWishlist} item={product} key={product.id}
                id={product.id}
                name={product.title} image={product.images} price={product.price} category={product.category}/>
              }) : 'No products Found'
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
