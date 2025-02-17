import React from 'react'
import Default from './Components/Right/Default.tsx'
import Notepad from './Components/Right/Notepad.tsx'
import Restore from './Components/Right/Restore.tsx'
import { useParams } from 'react-router-dom'
import useFetchNotes from './Hooks/useFetchNotes.tsx'
import NewNoteView from './Components/Right/NewNoteView.tsx'




function Right() {
    const{noteId , folderId} = useParams();

    const {data, loading, error} = useFetchNotes(`notes/${noteId}`)


if(noteId == "newnote"){ 
    return <NewNoteView />}
else if(noteId && (folderId != "trash")){
     return <Notepad />}
else if((folderId == "trash")&& (noteId)){ 
    return <Restore />}
else return <Default />


}

export default Right;