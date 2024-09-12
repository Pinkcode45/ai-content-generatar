"use client"
import React, { useState,useContext } from 'react';
import FormSection from '../-components/FormSection';
import OutputSection from '../-components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/Utils/AiModal';
import { db } from '@/Utils/db';
import { AIOutput } from '@/Utils/schema';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';



interface PROPS{
  params:{
    'template-slug':string;
  }
}

const CreateNewContent= (props:PROPS) => {
   
    const selectedTemplate:TEMPLATE|undefined=Templates?.find((item)=>item.slug==props.params['template-slug']);
    const [loading, setLoading]=useState(false);
    const [aiOutput,setAiOutput]=useState<string>('');
    const {user} =useUser();
    const {totalUsage, setTotalUsage}=useContext(TotalUsageContext);
    
    const router=usePathname();
  //console.log(router)
 

    //useRouter()

     
    


    const GenerateAIContent=async(formData:any)=>{
      if(totalUsage>=10000){
        console.log('please Upgrade');
        router.push('/dashboard/billing');
        return;
      }
      setLoading(true);
      const SelectedPrompt=selectedTemplate?.aiPrompt;
      const FinalAIPrompt=JSON.stringify(formData)+","+SelectedPrompt;
      const result =await chatSession?.sendMessage(FinalAIPrompt);

      
      setAiOutput(result?.response.text());
      await saveInDb(JSON.stringify(formData), selectedTemplate?.slug,result?.response.text())
      setLoading(false);

    }

    const saveInDb=async(formData:any,slug:any,aiResp:string)=>{
      const result=await db.insert(AIOutput).values({
        FormData:formData,
        templateSlug:slug,
        aiResponse:aiResp,
        createdBy:user?.primaryEmailAddress?.emailAddress,  
        createdAt:moment().format('DD/MM/yyyy'), 
 
      });

      console.log(result)

    }
    
  return (
    <div className='p-10'>
      <Link href={"/dashboard"}>
        <Button><ArrowLeft/>Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
       
        {/* Form Section */}
        <FormSection
        selectedTemplate={selectedTemplate}
        userFormInput={(v:any)=>GenerateAIContent(v)}
        loading={loading}/>

        {/* Output section */}
        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent;
