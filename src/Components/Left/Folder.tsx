import React, { useRef, useEffect, useState } from "react";
import fc from '../../assets/folder-close.svg';
import addFolder from '../../assets/add-folder.svg';
import useFetchNotes from "../../Hooks/useFetchNotes.tsx";
import usePatch from "../../Hooks/usePatch.tsx";
import { NavLink, useParams } from "react-router-dom";

function Folders() {
  
  const { folderId } = useParams();
  const { data, loading, error } = useFetchNotes(`folders`);
  const [selectedId,setSelectedId] = useState('');
  const [isNav, setIsNav] = useState(false);
  const [folderName, setFolderName] = useState('New Folder'); 
  const [url, setUrl] = useState('');
  const {patchData} = usePatch();
  console.log(data);


  function changeName(id,name) {
    setFolderName(name);
    setIsNav(true);
    setSelectedId(id);
  }


  function SaveName(id) {
    setUrl(`folders/${id}`)
    patchData(`/folders/${id}`,{name:folderName})
    setIsNav(false);
  }

  if (loading) return <h1 className="text-pink-700">Loading...</h1>;

  if (data)
    return (
      <div className='h-62'>
        <div className='px-5 pb-2 font-semibold text-white h-6.5 flex flex-row justify-between'>
          Folders <img src={addFolder} />
        </div>
        <ul className="overflow-y-auto max-h-50 scrl">
          {data.folders.map((f) => (
            (isNav && selectedId===f.id ) ? (
              <input
                type="text"
                value={folderName}
                onChange={(e)=> setFolderName(e.target.value)}
                onBlur={() => SaveName(f.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    SaveName(f.id);
                  }
                }}
                autoFocus
                className="text-white"
              />
            ) : (
              <NavLink
                to={`/folder/${f.id}`}
                key={f.id}
                className={`list ${f.id == folderId ? "active" : ""}`}
                onDoubleClick={() => changeName(f.id,f.name)}
              >
                <img className='w-5 h-5' src={fc} alt="" />
                <p className='truncate'>{f.name}</p>
              </NavLink>
            )
          ))}
        </ul>
      </div>
    );

  if (error) return <>{error}</>;
}

export default Folders;
