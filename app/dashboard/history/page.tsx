"use client";
import React from 'react';
import { eq, desc } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/Utils/db';
import { AIOutput } from '@/Utils/schema';
import { TEMPLATE } from '../_components/TemplateListSection';
import Image from 'next/image';
import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';


export interface HISTORY{
    id:Number,
    formData:string,
    aiResponse:string,
    templateSlug:string,
    createdBy:string,
    createdAt:string
}

async function History(){
    const user =await currentUser()

    // @ts-ignore
    const HistoryList:HISTORY[]=await db.select().from(AIOutput)
    .where(eq(AIOutput?.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(AIOutput.id));
 
    const GetTemplateName=(slug:string)=>{

        const template:TEMPLATE|any=Templates?.find((item)=>item.slug==slug)
        return template;
    }
  return (
    <div className='m-5 p-5 border rounded-lg bg-white'>
        <h2 className='font-bold text-3xl'>History</h2>
        <p className='text-gray-500'>Search your previously generate</p>
        <div className='grid grid-cols-7 font-bold bg-secondary mt-5'>
            <h2 className='col-span-2'>TEMPLATE</h2>
            <h2 className='col-span-2'>AI RESP</h2>
            <h2>Date</h2>
            <h2>WORDS</h2>
            <h2>COPY</h2>
        </div>

        <div>
          {HistoryList.map((item:HISTORY,index:number)=>(
            <>
            <div className='grid grid-cols-7 my-5 py-3 px-3'>
              <h2 className='col-span-2 flex gap-2 item-center'>
                <Image src={GetTemplateName(item?.templateSlug)?.icon} width={250}/>
                {GetTemplateName(item.templateSlug)?.name}
              </h2>
              <h2 className='col-span-2 line-clamp-3'>{item?.aiResponse}</h2>
              <h2>{item.createdAt}</h2>
              <h2>{item?.aiResponse.length}</h2>
              <h2>
                <Button variant='ghost' className='text-primary'
                onClick={()=>navigator.clipboard.writeText(item.aiResponse)}>Copy</Button>

              </h2>
            </div>
            <hr />
            </>

          ))}
        </div>


    </div>
  )
}

export default History;