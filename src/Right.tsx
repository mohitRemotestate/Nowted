import React from 'react'
import Default from './Components/Right/Default.tsx'
import Notepad from './Components/Right/Notepad.tsx'
import Restore from './Components/Right/Restore.tsx'
import { useParams } from 'react-router-dom'
import useFetchNotes from './Hooks/useFetchNotes.tsx'
import NewNoteView from './Components/Right/NewNoteView.tsx'




function Right(setPostRender) {

    const{noteId , folderId} = useParams();
    // console.log(setpostRender);
if(noteId == "newnote"){ 
    return <NewNoteView setPostRender={setPostRender.setPostRender}/>}
else if(noteId && (folderId != "trash")){
     return <Notepad />}
else if((folderId == "trash")&& (noteId)){ 
    return <Restore />}
else return <Default />


}

export default Right;