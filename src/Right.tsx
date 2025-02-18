import Default from './Components/Right/Default.tsx'
import Notepad from './Components/Right/Notepad.tsx'
import Restore from './Components/Right/Restore.tsx'
import { useParams } from 'react-router-dom'
import NewNoteView from './Components/Right/NewNoteView.tsx'





function Right() {

    const{noteId , folderId} = useParams(); 
    
   
    
if(noteId == "newnote"){ 
    return <NewNoteView />}
else if(noteId && (folderId == "trash")){
     return <Restore />}
else if((folderId != "trash")&& (noteId)){ 
    return <Notepad />}
else return <Default />


}

export default Right;