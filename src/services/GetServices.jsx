import axios from "axios";

const api = axios.create({
    baseURL : 'https://dummyjson.com/products'
})

export const getProducts = (path)=>{
    return api.get(path)
}