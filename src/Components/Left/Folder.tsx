import React from "react";
import fc from '../../assets/folder-close.svg'
import addFolder from '../../assets/add-folder.svg'
import useFetchNotes from "../../Hooks/useFetchNotes";
import { NavLink, useParams } from "react-router-dom";

function Folders({}){
  
  const {folderId} = useParams();
  const {data,loading,error} = useFetchNotes("folders",{folderId:folderId});

  // console.log(folderId)


  if(loading) return <h1 className="text-pink-700"> Loading...</h1>
    
  // if(!data) return <>unable to fetch data in folder</>

    return(
    <div className='h-62'>
      <div className='px-5 pb-2 font-semibold text-white h-6.5 flex flex-row justify-between'>Folders <img src={addFolder} /></div>
      <ul className="overflow-y-auto max-h-50 scrl">
        
        { data.folders.map((f)=>(
          <NavLink  
          to={`/folder/${f.id}`} 
          key={f.id} 
          className={`list ${f.id == folderId ? "active" : ""}`}>
            <img className='w-5 h-5' src={fc} alt="" /><p className='truncate'>{f.name}</p>
          </NavLink>
        ))}
      </ul>
    </div> 
    )
}

export default Folders