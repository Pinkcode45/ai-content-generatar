"use client"

import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import UsageTrack from './UsageTrack'

const SideNav = () => {

    const path=usePathname();
    useEffect(() =>{
        console.log(path)
    }, []) 

    const MenuList=[
        {
            name: 'Home',
            icon: Home,
            path: '/Dashboard'

        },

        {
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history'

        },

        {
            name: 'Billing',
            icon: WalletCards,
            path: '/dashboard/billing'

        },

        {
            name: 'Setting',
            icon: Settings,
            path: '/dashboard/setting'

        },
    ];
  return (
    <div className='relative h-screen shadow-sm border bg-white'>
        <div className='flex justify-center '>
            <Image
                src={'/Logo1.jpeg'}
                alt='log0'
                width={50}
                height={50}
                />
        </div>

        <hr  className='my-6 border'/>

        <div className='mt-3'>
            {MenuList.map((menu, index)=>(
                <div key={index} className={`flex gap-2 mb-2 p-3
                    hover:bg-primary hover:text-white
                    rounded-lg cursor-pointer items-center
                    ${path==menu.path&& 'bg-primary text-white'}
                    `}>
                    <menu.icon className='h-6 w-6'/>
                    <h2 className='text-lg'>{menu.name}</h2>
                       

                </div>
            ))}
        </div>

        <div className='absolute button-2 left-0 w-full'>
            <UsageTrack/>
        </div>
          
    </div>
  )
}

export default SideNav;