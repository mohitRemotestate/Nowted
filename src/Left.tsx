import React from 'react';
import { useEffect, useState } from 'react';
import logo from './assets/logo.svg'
import search from './assets/search-icon.svg'
import srch from './assets/searching.png'
import doc from './assets/doc-icon.svg'
import fc from './assets/folder-close.svg'
import archived from './assets/archived.svg'
import star from './assets/star.svg'
import trash from './assets/trash.svg'
import addFolder from './assets/add-folder.svg'

import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirectDocument } from 'react-router-dom';






function Left() {
  
  function Clicked(e) {
    console.log(e)
  }

  // const [recent,setRecent] = useState() 
  const recent = [{id:"1",title:"mohitthis is just a test to check whether it overflows the div or not "},{id:"2",title:"mohitthis is just a test to check whether it overflows the div or not "},{id:"3",title:"mohitthis is just a test to check whether it overflows the div or not "}]

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
      <input type='input' className='border-natural-800  rounded-xs text-white ' placeholder={<img src={srch} /> }/>
      :<button type="button" className=" border-natural-800 rounded-xs btn text-white w-full h-10 font-sans font-semibold ">+ New Note</button> }

      {/* */}
    </div>

    {/* recents */}
    <div className='py-7.5 h-54'>
      <div className='px-5 font-semibold text-white h-6.5 pb-2'>Recents</div>
      <ul>
        { recent.slice(0,3).map((rec)=>(
          <li key={rec.id} className='list recent' >
            <img className='w-5 h-5' src={doc} alt="" /><p className='truncate'>{rec.title}</p></li>
        ))}
      </ul>
    </div>  

    {/* Folders */}
      <div className='h-62'>
      <div className='px-5 pb-2 font-semibold text-white h-6.5 flex flex-row justify-between'>Folders <img src={addFolder} onClick={Clicked}/></div>
      <ul className="overflow-y-auto max-h-50 scrl">
        { folder.map((f)=>(
          <li key={f.id} onClick={Clicked} className='list'>
            <img className='w-5 h-5' src={fc} alt="" /><p className='truncate'>{f.name}</p></li>
        ))}
      </ul>
    </div>  


    {/* more */}
    <div>
    <div className='px-5 font-semibold text-white h-6.5 pb-2'>More</div>
    <ul>
          <li key="1" className='list' onClick={Clicked}><img src={star} /> Favourites</li>
          <li key="2" className='list' onClick={Clicked}><img src={trash} /> Trash</li>
          <li key="3" className='list' onClick={Clicked}><img src={archived} />Archived Notes</li>
    </ul>
    </div>
    </>
  );  
}

export default Left;
