"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection';
import TemplateListSection from './_components/TemplateListSection';

const Dashboard = () => {
  const [userSearchInput, setUserSearchInput] =useState<string>()
  return (
    <div>
        {/* search season */}
        <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)} />

        {/* Template List section */}
        <TemplateListSection  searchInput={userSearchInput}/>
    </div>
  )
}

export default Dashboard;