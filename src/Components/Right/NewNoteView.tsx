import { useState,useEffect,useContext } from "react";
import usePostRequest from '../../Hooks/usePost';
import menu from '../../assets/notepad-menu.svg';
import calender from "../../assets/calender-icon.svg";
import ficon from "../../assets/notes-file-icon.svg";
import { useParams,useNavigate } from 'react-router-dom';
import Rerender from '../../Context/Context';
import { toast } from 'react-toastify';
import useFetchFolder from '../../Hooks/useFetchFolder';

//set that after navigate to in the same file 
interface Folder{
  createdAt:string,
  deletedAt: string| null,
  id: string,
  name: string,
  updatedAt:string|null
}

function NewNoteView() {
  // setPostRender.setPostrender(prev => !prev)
    const {folderId} = useParams();
    const date = new Date().toISOString().split('T')[0];

    const [title, setTitle] = useState("New Note");
    const [content, setContent] = useState("Enter content here");
    const [isEditable, setIsEditable] = useState(false);
    const {postData,data,error} = usePostRequest();
    const render = useContext(Rerender);

    const {fetchFolder,data:folderData} = useFetchFolder()
    // const folderData = useFetchFolder(); //just for folder name

    const [folderName, setFolderName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      fetchFolder();
    }, [fetchFolder]);

    useEffect(() => {
      if (folderData) {
        const id = folderData?.folders?.find((i:Folder | null) => {
          if(i) return i.id === folderId});
        if(id) setFolderName(id.name);
      }
    }, [folderData,folderId]);

    const saveNotepad = async () => {
      const x = await postData("/notes", {
        folderId,
        title,
        content,
        isFavorite: false,
        isArchived: false,
      });
      navigate(`/folder/${folderId}/note/${x?.data.id}`);
      render.setrenderRecent((prev: boolean) => !prev);
    };

    useEffect(()=>{
      if(data) toast.success("Note created");
    },[data])

    useEffect(()=>{
      if(error) toast.error("Error while creating note")
    },[error])


  return (
    <div className="p-12 h-full w-full flex flex-col gap-7.5">
      {/* Top */}
      <div className="flex flex-row justify-between h-10">
        {isEditable ? (
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
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
                onChange={(e)=>setContent(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === "s" && e.ctrlKey) {
                        e.preventDefault()
                        saveNotepad()
                    }
                }}
                autoFocus
                className="text-white focus:outline-none h-full w-full"
            />
        </div>
    </div>
  );
}

export default NewNoteView;