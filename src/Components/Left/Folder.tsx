import React, { useEffect, useState } from "react";
import fc from '../../assets/folder-close.svg';
import folderIcon from '../../assets/add-folder.svg';
import useFetchNotes from "../../Hooks/useFetchNotes.tsx";
import usePatch from "../../Hooks/usePatch.tsx";
import { NavLink, useParams } from "react-router-dom";
import usePostRequest from "../../Hooks/usePost.tsx";
import useDelete from '../../Hooks/useDelete';

function Folders() {
  const { folderId } = useParams();
  const folder = useFetchNotes();
  const [selectedId, setSelectedId] = useState('');
  const [data, setData] = useState({...folder.data})
  const [isNav, setIsNav] = useState(false);
  const [folderName, setFolderName] = useState('New Folder'); 
  const patchData = usePatch();
  const { postData } = usePostRequest();
  const Delete = useDelete();
  

  // Fetch folders only once when component mounts
  useEffect(() => {
    folder.fetchData("folders");
  }, []); 
  useEffect(()=>{
    setData(folder.data)
    // console.log(folder.data)
  },[folder.data])

  const changeName = (id: string,name: string) => {
    setFolderName(name);
    setIsNav(true);
    setSelectedId(id);
  };

  // Patch request to save new folder name
  const saveName = async (id: string,name: string) => {
    if (name == "delete") {
      Delete.deleteData(`folders/${id}`)
        .then(() => console.log("Deleting folder..."))
        .catch(() => console.log("Error while deleting"));
      return;
    }
    try {
      await patchData.patchData(`/folders/${id}`, { name: folderName });
      folder.fetchData('folders');
    } catch (error) {
      console.error("Error updating folder name", error);
    }
    setIsNav(false);
  };

  if (folder.loading) {
    return (
      <div className='py-7.5 h-54'>
        <div className='px-5 font-semibold text-white h-6.5 pb-2'>Folders</div>
        <p className='text-white'>Loading...</p>
      </div>
    );
  }

  if(folder.data) return (<>
    <div className='flex flex-col flex-1 h-fit'>
      <div className='px-5 pb-2 font-semibold text-white h-6.5 flex flex-row justify-between'>
        Folders 
        <img
          src={folderIcon}
          alt="Add Folder"
          className="cursor-pointer"
          onClick={ () => {
            postData('/folders', { name: "New Folder" })
              .then(() => folder.fetchData("folders"))
              .catch((err) => console.error("Failed:", err));
          }
          }
        />
      </div>
      <ul className="flex flex-col overflow-y-auto h-50 scrl">
        {folder.data?.folders?.map((f) => (
          isNav && selectedId == f.id ? (
            <div className="list" key={f.id}>
              <img className='w-5 h-5' src={fc} alt="Folder Icon" />
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                onBlur={() => saveName(f.id,f.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveName(f.id,f.name);
                  }
                }}
                autoFocus
                className="text-white w-full"
              />
            </div>
          ) : (
            <NavLink
              to={`/folder/${f.id}`}
              key={f.id}
              className={`list ${f.id === folderId ? "activeFolder" : "hover:bg-gray-600"}`}
              onDoubleClick={() => changeName(f.id,f.name)}
            >
              <img className='w-5 h-5' src={fc} alt="Folder Icon" />
              <p className='truncate'>{f.name}</p>
            </NavLink>)
        ))}
      </ul>
    </div>
    </>
  );

  if (folder.error) {
    return <p className="text-white">{folder.error}</p>;
  }
}

export default Folders;



