import React, { useState,useEffect } from 'react';
import useFetchNotes from "./Hooks/useFetchNotes";
import { NavLink, useParams } from "react-router-dom";


interface Folder {
    id: number;
    name: string;
  }
  
  interface FolderData {
    folders: Folder[];
  }
  

function Mid() {

    const {folderId} =  useParams();

    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const folderData = useFetchNotes('folders') //just for folder name
    const [folderName, setFolderName] = useState('');
    const [url, setUrl] = useState({
        isFavorite : "",
        isArchived : "false",
        deleted : "false",
        page : 1,
        limit : 10,
});


    const newData =useFetchNotes('notes',url);
    useEffect(()=>{
        if(folderId == "trash"){
            setUrl({
                deleted: true,
            })
            newData.refetch();
        }else if(folderId == "favourite"){
            setUrl({
                favorite: true,
            })
            newData.refetch();
        }
        else if(folderId == "archived"){
            setUrl({
                archived: true,
            })
            newData.refetch();
        }

        setData(newData.data);
        setLoading(newData.loading)
        setError(newData.error);
    },[folderId,newData])


    //folder name
    useEffect(()=>{
        if(folderId ){
            if(folderId === "trash"){
                setFolderName("Trash")
            }
            else if(folderId === "favourite"){
                setFolderName("Favourite")
            }
            else if(folderId=== "archived"){
                setFolderName("Archived Notes")
            }
            else if(folderData.data){

                const id = folderData.data.folders.find(i => i.id ===folderId);
                setFolderName( id? id.name:"")
            }
        }
        else{
            setFolderName("All Files")
        }
    },[folderId])
    
    if(loading) return <h1 className='h-22 py-7.5 px-5 text-white'>Loading...</h1>
    if(data) return (
        <>
        <div className="h-22 py-7.5 px-5">
            {/* folder name */}
                <div className="w-75 h-7  border- ">
                    <p className='text-white font-sens  font-semibold h-7 text-2xl '>{folderName}</p>
                </div>
           

            {/* list of items */}
            <div>
            <ul className="overflow-y-auto max-h-215.5 scrl py-7.5 flex flex-col gap-2.5">
                {data.notes.length>0?(data.notes.length>0 && data.notes.map((f:any)=>(
                    <NavLink
                        to={`/folder/${f.folder.id}/note/${f.id}`}
                        key={f.id} 
                        // onClick={ClickActivity} 
                        className='h-24.5 p-5 text-white flex flex-col gap-2 '
                    >
                        <div className='truncate w-full h-7 font-sans font-semibold text-lg'>{f.title}</div>
                        <div className='flex flex-row gap-2.5'>
                            <div>21/06/2022</div>
                            <div className='truncate'>{f.title}</div>
                        </div>
                    </NavLink>
                ))):<div className=' h-24.5 p-5 text-white w-full h-7 font-sans font-semibold text-lg'>
                    Folder is empty
                    </div>}
            </ul>
            </div>
        </div>
        </>
    );

    if(error) return <>{error}</>
}

export default Mid;