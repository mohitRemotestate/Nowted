import { useState } from 'react';
import logo from './assets/logo.svg'
import search from './assets/search-icon.svg'
import doc from './assets/doc-icon.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirectDocument } from 'react-router-dom';






function Left() {
  
  // cosnt [recent,setRecent] = useState() 
  const recent = [{id:"1",title:"mohit"},{id:"2",title:"mohit"},{id:"3",title:"mohit"}]


  return (
    <>     
    <div className="flex justify-between px-5 py-7.5 ">
      <img src={logo} />
      <img src={search} />
    </div>


    <div className="px-5 ">
      <button type="button" className=" border-natural-800 rounded-xs btn text-white w-full h-10 font-sans font-semibold ">+ New Note</button>
    </div>

    {/* recents */}
    <div className='py-7.5 h-54'>
      <div className='px-5 font-semibold text-white h-6.5 pb-2'>Recents</div>
      <ul>
        { recent.slice(0,3).map((rec)=>(
          <li key={rec.id} className='h-10 flex flex-row gap-4 pb-1 border-2 border-purple-700 px-5 py-2.5'>
            <img className='w-5 h-5' src={doc} alt="" /><p className=' text-white'>{rec.title}</p></li>
        ))}
      </ul>
    </div>  

    {/* Folders */}

    </>
  );  
}

export default Left;
