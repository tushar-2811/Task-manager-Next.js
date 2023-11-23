import { ClipLoader } from 'react-spinners'



import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center items-center mt-80'>
       <ClipLoader size={40} color='black' />
    </div>
  )
}

export default loading;
