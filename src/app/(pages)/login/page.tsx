'use client'
import React from 'react'
import {useState} from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn } from '@/helper/userService'
import useAuth from '@/context/useAuth'

const login = () => {
  const [userName , setUserName] = useState("");
  const [password , setPassword] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async() => {
      console.log(userName , password);
      const data = await signIn({userName ,password});

      if(data.ok) {
         toast.success("successful login");
         console.log(data);
        //  router.replace('/profile')
        router.replace('/profile');
        auth.setAuth();

        

      }else{
         toast.error("error");
         console.log(data.msg);
      }
  }
  return (
    <div className='w-4/6 h-5/6 border-2 border-black mx-auto flex justify-center items-center mt-5'>
        

        <div className='w-1/2 flex flex-col border-[2px] rounded-xl m-16 py-8 '>
              
              <div className='flex justify-center items-center ' >
                <h1 className='text-4xl font-mono text-sky-500 ' > Sign In </h1>
              </div>

             <input type="text" placeholder='UserName' value={userName} onChange={(e) => setUserName(e.target.value)}
              className='px-4 py-2 focus:outline-sky-500 rounded-lg my-4 mx-4'
             />
             <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} 
             className='px-4 py-2 focus:outline-sky-500 rounded-lg my-4 mx-4'
             />

             <button 
             onClick={handleSubmit}
             className='bg-black text-sky-500 w-2/3 mx-auto p-2 rounded-xl ' > Sign In </button>

             <div className='mt-4 mx-auto' >
                <p className='text-neutral-400' > Don't have an Account ? <span onClick={() => router.push('/signup')} className='text-sky-500 hover:underline hover:cursor-pointer'> SignUp </span> </p>
             </div>
        </div>
    </div>
  )
}

export default login
