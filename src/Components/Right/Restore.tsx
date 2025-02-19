import React from 'react';
import resicon from '../../assets/restore-icon.svg';
import usePostRequest from "../../Hooks/usePost";
import { Navigate, useParams, useNavigate, data } from "react-router-dom";
import useFetchNotes from '../../Hooks/useFetchNotes';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';

function Restore(){
    const { postData } = usePostRequest();
    const { noteId } = useParams();
    const navigate = useNavigate();
    const singleNote = useFetchNotes();
    const [noteData, setNoteData] = useState<any>('');

    useEffect(()=>{
        singleNote.fetchSingleNote();
    },[noteId])

    useEffect(()=>{
        setNoteData(singleNote?.data?.note)
    },[singleNote.data])

    function restoreNote() {
      postData(`/notes/${noteId}/restore`).then(() =>
        navigate("/folder/trash")
      );
    }

    if(noteData) return (
      <>
        <div className="h-full w-full flex flex-col gap-2.5 text-white justify-center items-center">
          <div className="">
            <img src={resicon} />
          </div>
          <div className="font-sans font-semibold text-3xl">
            Restore "{noteData.title}""
          </div>
          <div className="w-115 flex-wrap text-base text-center">
            Don't want to lose this note? It's not too late! Just click the
            'Restore' button and it will be added back to your list. It's that
            simple.
          </div>
          <button
            type="button"
            onClick={restoreNote}
            className="bg-[#312EB5] w-28 h-10.5 rounded-xl"
          >
            {" "}
            Restore
          </button>
        </div>
      </>
    );
    else if(singleNote.error){
        <div className="h-full w-full flex flex-col gap-2.5 text-white text-3xl justify-center items-center">
            Got Error.... please Refresh
        </div>
    }
    else return(
        <>
        
        <div className="h-full w-full flex flex-col gap-2.5 text-white text-3xl justify-center items-center">
            Loading...
        </div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"/>
        </>
    )
}

export default Restore;