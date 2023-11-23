'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useCurrentUser, { fetcherfxn } from '@/context/useCurrentUser'
import { ClipLoader } from 'react-spinners'
import useAuth from '@/context/useAuth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'


const Header = () => {
  
  const path = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async() => {
      await axios.get("/api/logout");
      auth.removeAuth();
      router.replace('/');
      Cookies.remove("userId");
      toast.success("Log out")
  }

  const {isLoading , data} = useCurrentUser("/api/currentuser");
  
  if(isLoading) {
     return <div className='flex justify-center items-center mt-0'>
     <ClipLoader size={40} color='black' />
  </div>
  }

  else{
    return (
      <nav className='h-16 p-2 items-center flex justify-around border-b-2 mx-4' >
         <div className='text-2xl font-mono font-bold' > Todo-App </div> 
  
         <div className='flex gap-3 text-xl ' >
           <Link href={"/"} className={`${path == "/" ? "text-sky-500 border-b-2" : ""}` }> Home </Link>
           <Link href={"/add"} className={`${path == "/add" ? "text-sky-500 border-b-2" : ""}` }> Add-Task </Link>
           <Link href={"/show"} className={`${path == "/show" ? "text-sky-500 border-b-2" : ""}` }> Show-Task </Link>
         </div>
  
         <div className='hidden md:flex gap-2' >
  
  
           {
             auth.isAuth ? (
             <>
              <Link href={"/profile"} >
              <p 
              className={` px-4 py-1 rounded-xl ${path == "/profile" ? "bg-black text-sky-500" : " hover:bg-black hover:text-sky-500"}`} >
                  {data?.userName}
              </p>
           </Link>
  
       
              <button
              onClick={handleLogout}
              className='border-2 border-black px-4 py-1 rounded-xl hover:bg-black hover:text-white' >
                   LogOut
              </button>
       
             </>) : (
              <>
               <Link href={"/login"} >
              <button 
              className='border-2 border-black px-4 py-1 rounded-xl hover:bg-black hover:text-white' >
                   Sign In 
              </button>
              </Link>
              </>
             )
           }
  
          
  
          
         </div>
      </nav>
    )
  }
  


 
}

export default Header
