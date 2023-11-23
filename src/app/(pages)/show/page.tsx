'use client';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const page = () => {
    const userId = Cookies.get("userId");
    const [tasks , setTasks] = useState<any>([]);
    // const [isLoading , setIsLoading] = useState(true);
    
    useEffect(() => {
       const fetchData = async() => {
            const {data} = await axios.get(`api/todo?userid=${userId}`);
            if(data.ok){
               setTasks([...data.todos]);
            }
            // setIsLoading(false);
       }
       fetchData();
    } , [])

    const handleDelete = async (id : any) => {
         try {

           const {data} = await axios.delete(`/api/todo/${id}`);

           if(data.ok){
             setTasks([...data.todos]);
             toast.success("deleted");
           }else{
            toast.error("something went wrong");
           }
          
           
         } catch (error) {
           console.log(error);
           toast.error("couldn't delete")
         }
    }


   
      
      return (
        <div className='container grid mt-3'>
    
          <div className='mb-10' >
            <h1 className='text-3xl text-center font-mono text-sky-500'> My Tasks - {tasks.length} </h1>
          </div>
         
          <div className='border-2 w-5/6 mx-auto flex flex-wrap justify-around p-8 gap-4'>
    
            {
              tasks.map((task : any) => (
                <>
                 <div className='border-2 border-black w-72 h-28 rounded-lg'>
                      <div className='border-b-2 flex justify-center '>
                        <h1 className='text-xl font-mono text-black' > {task.title} </h1>
                      </div>
    
                      <div className='px-2'>
                        <p className='text-gray-600' > {task.body} </p>
                      </div>
    
                      <div className='m-4 flex justify-center items-center' >
                        <button 
                        onClick={() => handleDelete(task.id)}
                        className='text-red-500 border-2 border-red-500 px-4 py-1 rounded-lg hover:bg-red-500 hover:text-white'> Delete </button>
                      </div>
                 </div>
                </>
              ))
            }
               
          </div>
    
        
        </div>
      )
    }


  


export default page
