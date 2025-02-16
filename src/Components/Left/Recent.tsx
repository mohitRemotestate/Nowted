import React from 'react'
import doc from '../../assets/doc-icon.svg'
import useFetchNotes from "../../Hooks/useFetchNotes";
import { NavLink,useParams } from 'react-router-dom';



function Recent () {

  const {data, loading, error} = useFetchNotes("notes/recent");
  const { folderId, noteId} = useParams();
  
  if(loading) return (
    <>
      <div className='py-7.5 h-54'>
      <div className='px-5 font-semibold text-white h-6.5 pb-2'>Recents</div>
      <p className='text-white'>Loading...</p>
      </div>
    </>
)

    if(data)return(
        (data && <div className='py-7.5 h-54'>
      <div className='px-5 font-semibold text-white h-6.5 pb-2'>Recents</div>
      <ul>
        { data.recentNotes.map((rec:any)=>(
          <NavLink 
          to={`/folder/${rec.folder.id}/note/${rec.id}`}
          key={rec.id} 
          className={`list recent ${rec.id == noteId ? "active" : "hover:bg-gray-600"} `} >
            <img className='w-5 h-5' src={doc} alt="" /><p className='truncate'>{rec.title}</p>
            </NavLink>
        ))}
      </ul>
      </div>  )
    )

  if(error) return <>{error}</>


}

export default Recent;  