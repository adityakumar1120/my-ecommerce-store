import { useEffect } from "react";

 export const useLocalStorage = (key , val)=>{
    useEffect(()=>{
      localStorage.setItem(key , JSON.stringify(val))
      console.log(key);
    }, [val])
  }