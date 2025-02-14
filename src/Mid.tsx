import React, { useState } from 'react';
import useFetchNotes from "./Hooks/useFetchNotes";
import { NavLink, useParams } from "react-router-dom";



function Mid() {

    const {folderId} =  useParams();

        // console.log(folderId)
    
    const {data,loading,error} = useFetchNotes("notes",{folderId: folderId})
    
    console.log(data)
    if(loading) return <h1>Loading...</h1>

    return (
        <>
        <div className="h-22 py-7.5 px-5">
            {/* folder name */}
                <div className="w-75 h-7  border- ">
                    {/* Display the folder name here */}
                    <p className='text-white font-sens  font-semibold h-7 text-2xl '>{data.folder}</p>
                </div>
           

            {/* list of items */}
            <div>
            <ul className="overflow-y-auto max-h-215.5 scrl py-7.5 flex flex-col gap-2.5">
                { data.notes.map((f:any)=>(
                    <NavLink
                        to={`/folder/${f.folder.id}/note/${f.id}`}
                        key={f.id} 
                        // onClick={ClickActivity} 
                        className='h-24.5 p-5 text-white flex flex-col gap-2.'
                    >
                        <div className='truncate w-full h-7 font-sans font-semibold text-lg'>{f.title}</div>
                        <div className='flex flex-row gap-2.5'>
                            <div>21/06/2022</div>
                            <div className='truncate'>{f.title}</div>
                        </div>
                    </NavLink>
                ))}
            </ul>
            </div>
        </div>
        </>
    );
}

export default Mid;