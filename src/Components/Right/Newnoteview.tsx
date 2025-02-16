import { useState,useEffect } from "react";
import usePostRequest from '../../Hooks/usePost';
import menu from '../../assets/notepad-menu.svg';
import calender from "../../assets/calender-icon.svg";
import ficon from "../../assets/notes-file-icon.svg";
import { useParams } from 'react-router-dom';
import useFetchNotes from "../../Hooks/useFetchNotes";

function NewNoteView() {
    const {folderId} = useParams();
    const date = new Date().toISOString().split('T')[0];

    const [title, setTitle] = useState("New Note");
    const [content, setContent] = useState("Enter content here");
    const [isEditable, setIsEditable] = useState(false);
    const {postData} = usePostRequest
    const folderData = useFetchNotes('folders') //just for folder name
    const [folderName, setFolderName] = useState('');

    useEffect(()=>{
        if(folderData.data){
            const id = folderData.data.folders.find(i => i.id ===folderId);
            setFolderName(id.name)}
    },[])

 
  function saveNotepad(){
    postData("/notes", {
        folderId,
        title,
        content,
        isFavorite: false,
        isArchived: false,
      });
  }


  return (
    <div className="p-12 h-full w-full flex flex-col gap-7.5">
      {/* Top */}
      <div className="flex flex-row justify-between h-10">
        {isEditable ? (
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveNotepad();
            }}
            onBlur={saveNotepad}
            autoFocus
            className="text-white text-4xl font-bold h-10 w-full focus:outline-none"
          />
        ) : (
          <span
            onClick={() => setIsEditable(true)}
            className="text-white h-10 truncate font-bold w-full text-4xl"
          >
            {title}
          </span>
        )}
        <div id="menuIcon" >
          <img src={menu} alt="menu" />
        </div>
      </div>

      {/* Date and Folder */}
      <div className="h-17 flex flex-col justify-between">
                        <div className="flex flex-row justify-between w-53 text-white h-18px">
                            <img src={calender} alt="calendar" />
                            <div>Date</div>
                            <div>{date}</div>
                        </div>
                        <div className="border-2 border-b-white" />
                        <div className="flex flex-row justify-between w-53 text-white h-18px">
                            <img src={ficon} alt="folder icon" />
                            <div>Folder</div>
                            <div className="text-white">{folderName}</div>
                        </div>
                    </div>

    {/* here comes the context */}
        <div className="h-full">
            <textarea
                id="body"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === "s" && e.ctrlKey) {
                        e.preventDefault()
                        saveNotepad()
                    }
                }}
                onBlur={saveNotepad}
                autoFocus
                className="text-white focus:outline-none h-full w-full"
            />
        </div>
    </div>
  );
}

export default NewNoteView;