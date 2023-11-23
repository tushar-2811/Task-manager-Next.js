"use client"
import React , {useState} from 'react'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signUp } from '@/helper/userService';

const page = () => {
    const [name , setName] = useState("");
    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        try {

            const data = await signUp({name , userName , password});
            if(data.ok) {
                console.log(data);
                router.push('login')
                toast.success("account created");
 
            }else{
                console.log(data.error);
                toast.error(data.msg);
            }
            
        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }
    }


  return (
    <div className='w-4/6 h-5/6 border-2 border-black mx-auto flex justify-center items-center mt-5'>
        

        <div className='w-1/2 flex flex-col border-[2px] rounded-xl m-16 py-8 '>
              
              <div className='flex justify-center items-center ' >
                <h1 className='text-4xl font-mono text-sky-500 ' > Sign Up </h1>
              </div>

              <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}
              className='px-4 py-2 focus:outline-sky-500 rounded-lg my-4 mx-4'
             />

             <input type="text" placeholder='UserName' value={userName} onChange={(e) => setUserName(e.target.value)}
              className='px-4 py-2 focus:outline-sky-500 rounded-lg my-4 mx-4'
             />

             <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} 
             className='px-4 py-2 focus:outline-sky-500 rounded-lg my-4 mx-4'
             />

             <button 
             onClick={handleSubmit}
             className='bg-black text-sky-500 w-2/3 mx-auto p-2 rounded-xl ' > Create Account </button>

             <div className='mt-4 mx-auto' >
                <p className='text-neutral-400' > Already Have an Account ? <span onClick={() => router.push('/login')} className='text-sky-500 hover:underline hover:cursor-pointer'> Sign In </span> </p>
             </div>
        </div>
    </div>
  )
}

export default page
