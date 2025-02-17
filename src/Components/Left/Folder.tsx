import React, { useRef, useEffect, useState } from "react";
import fc from '../../assets/folder-close.svg';
import folderIcon from '../../assets/add-folder.svg';
import useFetchNotes from "../../Hooks/useFetchNotes.tsx";
import usePatch from "../../Hooks/usePatch.tsx";
import { NavLink, useParams } from "react-router-dom";
import usePostRequest from "../../Hooks/usePost.tsx";

function Folders() {
  
  const { folderId } = useParams();
  const folder = useFetchNotes(`folders`);
  const [selectedId,setSelectedId] = useState('');
  const [isNav, setIsNav] = useState(false);
  const [folderName, setFolderName] = useState('New Folder'); 
  const Patchdata = usePatch();
  const {postData} = usePostRequest();

  function changeName(id,name) {
    setFolderName(name);
    setIsNav(true);
    setSelectedId(id);
  }

  //name change patch file
  const SaveName = async(id) =>{
    await (Patchdata.patchData(`/folders/${id}`,{name:folderName})).then(folder.refetch);
    setIsNav(false);
    
  }

  if (folder.loading) return(
    <>
    <div className='py-7.5 h-54'>
    <div className='px-5 font-semibold text-white h-6.5 pb-2'>Recents</div>
    <p className='text-white'>Loading...</p>
    </div>
  </> 
  )

  if (folder.data)
    return (
      <div className='flex flex-col flex-1 h-fit'>
        <div className='px-5 pb-2 font-semibold text-white h-6.5 flex flex-row justify-between'>
          Folders <img src={folderIcon} onClick={async()=> {
             await postData('/folders', { name: "New folder" }).then(folder.refetch)

          }}/>
        </div>
        <ul className="flex flex-col overflow-y-auto h-50 scrl">
          {folder.data.folders.map((f) => (
            (isNav && selectedId===f.id ) ? (
              <div className="list ">
              <img className='w-5 h-5' src={fc} alt="" />
              <input
                type="text"
                value={folderName}
                onChange={(e)=> setFolderName(e.target.value)}
                onBlur={() => SaveName(f.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    SaveName(f.id);
                    folder.refetch();
                  }
                }}
                autoFocus
                className="text-white w-full  "
              />
              </div>
            ) : (
              <NavLink
                to={`/folder/${f.id}`}
                key={f.id}
                className={`list ${f.id == folderId ? "active" : "hover:bg-gray-600"}`}
                onDoubleClick={() => changeName(f.id,f.name)}
              >
                <img className='w-5 h-5' src={fc} alt="" />
                <p className='truncate '>{ f.name}</p>
              </NavLink>
            )
          ))}
        </ul>
      </div>
    );

  if (folder.error) return <>{folder.error}</>;
}

export default Folders;

