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
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import usePostRequest from './Hooks/usePost.tsx';


function Left() {
  const {folderId} = useParams();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const navigate = useNavigate();
  
  function handleClick() {
    if (folderId && !["trash", "favorite", "archived"].includes(folderId)){
      navigate(`/folder/${folderId}/note/newnote`);
    } else {
      alert("Choose any folder first");
    }
  }

  return (
    <div className='flex flex-col h-full'>     

    <div className="flex justify-between px-5 py-7.5 ">
      <img src={logo} />
      <img src={search} onClick={()=>(setIsSearch(p=>!p))}/>
    </div>

    {/* search and new file  */}
    <div className="px-5 " id='isSearch'>
      
  {isSearch?
  (<div className='border-natural-800 btn rounded-xs flex flex-row gap-2 p-2.5 h-10 w-full'>
    <div>
      <img src={srch}/>
    </div>
    <input type='input' className='border-white rounded-xs text-white w-full' placeholder="Search note"/>
  </div>)
  :<button 
  type="button" 
  onClick={handleClick}
  className=" border-natural-800 rounded-xs btn text-white w-full h-10 font-sans font-semibold ">
    + New Note
  </button> }
</div>
    <div className='flex flex-col'>
    {/* recents */}
        <Recent />  
    

    {/* Folders */}
      <Folders />


    {/* more */}
        <More />
    </div>
    </div>
  );  
}

export default Left;



