"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React,{useReducer, useState} from 'react'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'

const page = () => {
  const [title , setTitle] = useState("");
  const [body , setBody] = useState("");
  const [status , setstatus] = useState(false);
  const router = useRouter();

  const onSubmit = async() => {
     let userId = Number(Cookies.get("userId"));
     console.log(title , body ,status , userId);

     try {
      const {data} = await axios.post("/api/todo" , {title , body , status , userId});

      if(data.ok){
        router.push('/show');
        toast.success("New Todo Added");
      }else{
        toast.error("something went wrong");
      }
      
     } catch (error) {
       console.log(error);
       toast.error("error in creating todo");
     }
  }
  return (
    <div className='w-4/6 h-5/6 border-2 border-black mx-auto flex justify-center items-center mt-5'>
        

        <div className='w-1/2 flex flex-col border-[2px] rounded-xl m-16 py-8 '>
              
              <div className='flex justify-center items-center ' >
                <h1 className='text-4xl font-mono text-sky-500 ' > Add New Task </h1>
              </div>

              <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}
              className='px-4 py-2  border-[3px] focus:outline-sky-500 rounded-lg my-4 mx-4'
             />

             <input type="text" placeholder='Describe Task' value={body} onChange={(e) => setBody(e.target.value)}
              className='px-4 py-2 border-[3px] focus:outline-sky-500 rounded-lg my-4 mx-4'
             />
              
           <div className='flex justify-start items-center gap-x-2 px-4 py-2'>
           <label htmlFor="" className='text-xl text-sky-400'> Completed </label>
             <input type="checkbox" checked={status} onChange={(e) => setstatus(!status)} 
             className='px-4 py-2 focus:outline-sky-500 rounded-lg my-4 mx-4'
             />
           </div>

             <button 
             onClick={onSubmit}
             className='bg-black text-sky-500 w-2/3 mx-auto p-2 rounded-xl ' > Create Task </button>

             <div className='mt-4 mx-auto' >
                <p className='text-neutral-400' >Wanna See Your Tasks ? <span onClick={() => router.push('/login')} className='text-sky-500 hover:underline hover:cursor-pointer'> Click Here </span> </p>
             </div>
        </div>
    </div>
  )
}

export default page
