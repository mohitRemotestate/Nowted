import React, { useEffect, useState } from "react";
import menu from '../../assets/notepad-menu.svg';
import useFetchNotes from "../../Hooks/useFetchNotes";
import calender from "../../assets/calender-icon.svg";
import ficon from "../../assets/notes-file-icon.svg";
import { useParams } from "react-router-dom";
function Notepad(){

    const {noteId} = useParams();

    const {data, loading, error} = useFetchNotes("notes",{noteId:noteId});
    const [text, setText] = useState("Loading");

    // useEffect(()=>{
    //     const date = new Date(data.notes[0].updatedAt)
    // },[data])

    function handleChange(e) {
        setText(e.target.value)
    }
    
    
    useEffect(()=>{
        // console.log(data)
        if(data) 
            setText(data.notes[0].preview);
    },[data])
    

    if (loading) return <h1 className="text-white">Loading...</h1>;
    if (error) return <>Here is an error</>

    return(
        <>
            {data && <div className="p-12 h-full w-full flex flex-col gap-7.5">

                {/* top */}
                <div className="flex flex-row justify-between h-10">
                    {data && <div className="text-white text-5xl">{data.notes[0].title}</div> }
                    <div><img src={menu} ></img></div>
                </div>

                {/* date and folder */}
                <div className="h-17 flex flex-col justify-between">
                    <div className="flex flex-row justify-between w-53 text-white h-18px "><
                        img src={calender} />
                        <div>Date</div> 
                        {/* <div>{(date.toISOString().split('T')[0])}</div> */}
                        <div>{data.notes[0].updatedAt}</div>    
                    </div>
                    <div className="border-2 border-b-white" />
                    <div className="flex flex-row justify-between w-53 text-white h-18px">
                        <img src={ficon} />
                        <div>Folder</div> 
                        <div className="text-white">{data.notes[0].folder.name}</div>
                    </div>
                </div>

                {/* text area */}
                <div className="h-full">
                <textarea value={text} onChange={handleChange} className="text-white focus:outline-none h-full w-full "/>
                
                </div>
            </div>}
        </>
    )
}

export default Notepad;