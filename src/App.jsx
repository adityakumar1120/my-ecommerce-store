import React, { useEffect, useState } from 'react'
import Home from './pages/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/footer'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Search from './pages/Search'
import Products from './pages/Products'
import WishList from './pages/WishList'
import { useLocalStorage } from './hooks/useLocalStorage'
import AboutPage from './pages/AboutPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

export default function App() {
  const [data , setData] = useState(()=>{
    let localVal = JSON.parse(localStorage.getItem('data'))
    if(localVal) return localVal
    return [] 
  })
  const [categories , setCategories] = useState(()=>{
    let localVal = JSON.parse(localStorage.getItem('categories'))
    if(localVal) return localVal
    return [] 
  })
  const [wishlist , setWishlist] = useState(()=>{
    let localVal = JSON.parse(localStorage.getItem('wishlist'))
    console.log(localVal);
    if(localVal) return localVal
    return [] 
  })
  const [cartData , setCartData] = useState(()=>{
    let localVal = JSON.parse(localStorage.getItem('cartData'))
    console.log(localVal);
    if(localVal) return localVal
    return [] 
  })
  const [searchData , setSearchData] = useState([])
  const [popUpCart , setpopUpCart] = useState([])
    const [sortBy , setSortBy] = useState([
      {
        val : 'ascending',
        id : 0,
        isSelected : false
      },
      {
        val : 'descending',
        id : 1,
        isSelected : false
      },
    ])
    const [sortByPrice , setSortByPrice] = useState([
      {
          val : '',
          isSelected : false,
          id : 0
      },
      {
          val : [0 , 50],
          isSelected : false,
          id : 1
      },
      {
          val : [50 , 70],
          isSelected : false,
          id : 2
      },
      {
          val : [70 , 100],
          isSelected : false,
          id : 3
      },
      {
          val : [100 , 150],
          isSelected : false,
          id : 4
      },
  ])

 
  useLocalStorage('data' , data)
  useLocalStorage('categories' , categories)
  useLocalStorage('cartData' , cartData)
  useLocalStorage('wishlist' , wishlist)
  return (
    <>
    <BrowserRouter>
    <Nav setSearchData={setSearchData} searchData={searchData} wishlist={wishlist} cartData={cartData} setCartData={setCartData}/>
    <Routes>
      <Route path='/' element={<Home categories={categories} setCategories={setCategories} setpopUpCart={setpopUpCart} wishlist={wishlist} setWishlist={setWishlist} cartData={cartData} setCartData={setCartData}
      data={data} setData={setData} sortBy={sortBy} setSortBy={setSortBy} sortByPrice={sortByPrice} setSortByPrice={setSortByPrice}/>} />

      <Route path='/about' element={<AboutPage/>} />

      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      
      <Route path='/cart' element={<Cart cartData={cartData} setCartData={setCartData}/>} />

      <Route path='/contact' element={<Contact />} />
      
      <Route path='/search' element={<Search setpopUpCart={setpopUpCart} setCartData={setCartData} wishlist={wishlist} setWishlist={setWishlist} searchData={searchData} setSearchData={setSearchData}
      sortBy={sortBy} setSortBy={setSortBy} sortByPrice={sortByPrice} setSortByPrice={setSortByPrice}
      />} />
      <Route path='/:products' element={<Products cartData={cartData} setCartData={setCartData} wishlist={wishlist} setWishlist={setWishlist} data={data} setData={setData}/>} />

      <Route path='/wishlist' element={<WishList wishlist={wishlist} setWishlist={setWishlist} data={data} setData={setData}/>} />
      
    </Routes>
    <div className='fixed flex flex-col gap-2 bottom-4 right-2'>
      {popUpCart.map((elem , i) =>{
        return <div key={i} className='shadow rounded bg-white text-[#DD4444] px-6 py-2'>{elem.message}</div>
      })}
    </div>
    <Footer/>
    </BrowserRouter>
    </>
  )
}
