import { Search } from 'lucide-react'
import React from 'react'

const SearchSection = ({onSearchInput}:any) => {
  return (
    <div className='flex flex-col justify-center items-center p-10 bg-gradient-to-br
     from-purple-500 via-purple-700 to-blue-600 text-white'>
        <h2 className='text-3xl font-bold'>Brouse All Template</h2>
        <p>What would you like to create today?</p>
        <div className='w-full flex justify-center'>
            <div className='flex gap-2 item-center p-2 border rounded-md bg-white my-5 w-[30%] '>
                <Search  className='text-primary'/>
               <input type="text" placeholder='search'
              onChange={(event)=>onSearchInput(event.target.value)}
               className='bg-transparent w-full outline-none text-black' />
            </div>
        </div>
    </div>
  )
}

export default SearchSection