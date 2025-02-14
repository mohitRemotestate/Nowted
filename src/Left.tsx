import React from 'react';
import { useEffect, useState } from 'react';
import logo from './assets/logo.svg'
import search from './assets/search-icon.svg'
import srch from './assets/searching.svg'
import Recent from './Components/Left/Recent.tsx'
import Folders from './Components/Left/Folder.tsx'
import More from './Components/Left/More.tsx'
import Data from './Components/Data/Data.tsx'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirectDocument } from 'react-router-dom';






function Left() {


  //folder
  const folder = [{id:"1",name:"folder1"},{id:"2",name:"folder1"},{id:"3",name:"folder1"},{id:"4",name:"folder1"},{id:"5",name:"folder1"},{id:"6",name:"folder1"},{id:"7",name:"folder1"},{id:"8",name:"folder1"}]


  const [isSearch, setIsSearch] = useState<boolean>(false);
  

  return (
    <>     

    <div className="flex justify-between px-5 py-7.5 ">
      <img src={logo} />
      <img src={search} onClick={()=>(setIsSearch(p=>!p))}/>
    </div>

    {/* search and new file  */}
    <div className="px-5 " id='isSearch'>
      {isSearch?
      <div className='border-natural-800 btn rounded-xs flex flex-row gap-2 p-2.5 h-10'>
          <div>
            <img src={srch}/>
          </div>
        
        <input type='input' className='border-white rounded-xs text-white ' placeholder="Search note"/>
      </div>
      :<button type="button" className=" border-natural-800 rounded-xs btn text-white w-full h-10 font-sans font-semibold ">+ New Note</button> }
    </div>

    {/* recents */}
        <Recent />  
    

    {/* Folders */}
      <Folders />


    {/* more */}
        <More />
    </>
  );  
}

export default Left;
