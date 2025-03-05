//toast baki h
import { useEffect, useState,useContext, useCallback } from "react";
import menu from '../../assets/notepad-menu.svg';
import calender from "../../assets/calender-icon.svg";
import ficon from "../../assets/notes-file-icon.svg";
import { useParams, useNavigate } from "react-router-dom";
import usePatch from "../../Hooks/usePatch.tsx";
import favNote from "../../assets/favStarNotepad.svg"
import delNote from "../../assets/DeleteNotepadIcon.svg"
import archiveNote from "../../assets/archivedNotepad.svg"
import useDelete from "../../Hooks/useDelete.tsx";
import Rerender from '../../Context/Context';
import useFetchSingleNote from '../../Hooks/useFetchSingleNote.tsx';
import useFetchFolder from "../../Hooks/useFetchFolder.tsx";


function Notepad() {
  const { noteId,folderId } = useParams();
  const {data:singleNoteData, fetchSingleNote,loading,error} = useFetchSingleNote();
  const {setrenderRecent,folderName} = useContext(Rerender);
  const {patchData} = usePatch();
  const Delete = useDelete();

  //data, loading, error
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isArchived, setisArchived] = useState(false);
  const [isFavorite, setIsfavorite] = useState(false);
  const [ popupVisible, setPopupVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const {fetchFolder,data:folders} = useFetchFolder();
  const [isChangeFolderVisible, setIsChangeFolderVisible] = useState(false);

  useEffect(() => {
    fetchSingleNote();
  }, [noteId,fetchSingleNote]);

  useEffect(()=>{
    fetchFolder();
  },[fetchFolder])

  const date = singleNoteData
    ? new Date(singleNoteData.note.updatedAt).toISOString().split("T")[0]
    : "";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (singleNoteData) {
      setContent(singleNoteData.note.content);
      setTitle(singleNoteData.note.title);
      // console.log(isArchived)
      setIsfavorite(singleNoteData.note.isFavorite);
      setisArchived(singleNoteData.note.isArchived);

    }
  }, [singleNoteData]);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
  
    if (target.closest(".popup-container") || target.closest("#menuIcon")) {
      return;
    }
    setPopupVisible(false);
  };

  const handleMenuClick = () => {
    setPopupVisible((prev) => !prev);
  };

  const handleOptionClick = async (option: string) => {
    if(singleNoteData){
    switch (option) {
      case "Archived":
        { const updatedArchive = !isArchived;
        await patchData(`notes/${singleNoteData.note.id}`, {
          title,
          content,
          isArchived: updatedArchive,
        }).then(()=>{if(isArchived){
          // console.log("folder should change")
          navigate(`/folder/${singleNoteData?.note.folderId}/note/${noteId}`)
        }else{
          navigate(`/folder/${folderId}`)
        }});
        setisArchived(updatedArchive);
        setrenderRecent((prev: boolean) => !prev);
        
        break;
        }
      case "Favorite":
        {const updatedFavorite = !isFavorite;
        console.log("Fav:" + isFavorite);
        patchData(`notes/${singleNoteData.note.id}`, {
          title,
          content,
          isFavorite: updatedFavorite, //added title and content so that these become extra button to save data
        });
        setIsfavorite(updatedFavorite);
        setrenderRecent((prev: boolean) => !prev);
        break;}

      case "Delete": {
        {console.log("deleting a note");
        deleteNoteById();
        break;
      }}
      default:
        break;
    }
    setPopupVisible(false);
}
  };

  const deleteNoteById = async () => {
    await Delete.deleteData(`notes/${noteId}`).then(() =>
    {setrenderRecent(prev=>!prev)
      navigate(`/folder/trash/note/${noteId}`)}
    );
  };


  const saveNotepad = useCallback(() => {
    patchData(`notes/${noteId}`, {
      title,
      content,
      isArchived,
      isFavorite,
    })
      .then(() => {
        setIsEditable(false);
        setrenderRecent((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  }, [patchData, noteId, title, content, isArchived, isFavorite, setrenderRecent]);
  

  //DeBouncing funtion
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveNotepad();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [content, saveNotepad, title]);

  function handleFolderChangeMenu(){
    // console.log(folders)
    setIsChangeFolderVisible(prev=>!prev)
  }

  function ChangeFolder(id:string){
    // console.log(id)
    patchData(`notes/${noteId}`,{
      folderId: id,
    }).then(()=>navigate(`/folder/${id}/note/${noteId}`))
    setIsChangeFolderVisible(prev=> !prev)

  }

  if (loading) return <h1 className="text-white">Loading...</h1>;

  if (singleNoteData)
    return (
      <>
        {
          <div className="p-12 h-full w-full flex flex-col gap-7.5 ">
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
                  // onBlur={saveNotepad}
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
              <div id="menuIcon" onClick={handleMenuClick}>
                <img src={menu} alt="menu" />
              </div>
            </div>

            {/* Popup for options */}
            {popupVisible && (
              <div className="popup-container absolute right-19 top-20 bg-[#333333] text-black w-50 h-37.5 flex flex-col items-center justify-around border rounded-md shadow-md">
                <button
                  onClick={() => handleOptionClick("Archived")}
                  className="py-2 flex flex-row px-4 gap-4 w-full text-left hover:bg-gray-500 text-white"
                >
                  <img src={archiveNote} />
                  {isArchived ? "Remove Archive" : "Archive"}
                </button>
                <button
                  onClick={() => handleOptionClick("Favorite")}
                  className="py-2 flex flex-row px-4 gap-4 w-full text-left hover:bg-gray-500 border-b-2 border-white text-white"
                >
                  <img src={favNote} />
                  {isFavorite ? "Remove Favourite" : "Favourite"}
                </button>

                <button
                  onClick={() => handleOptionClick("Delete")}
                  className="py-2 flex flex-row px-4 gap-4 w-full text-left hover:bg-gray-500 text-white"
                >
                  <img src={delNote} />
                  Delete
                </button>
              </div>
            )}

            {/* Date and Folder */}
            <div className="h-17 flex flex-col justify-between">
              <div className="flex flex-row justify-between w-53 text-white h-18px">
                <div className="flex flex-row gap-2 h-4.5">
                  <img src={calender} alt="calendar" />
                  <div>Date </div>
                  <div>{date}</div>
                </div>
              </div>
              <div className="border-2 border-b-white" />
              <div className="flex flex-row justify-left text-white h-4.5 gap-2">
                <div className="flex flex-row gap-2 h-4.5">
                  <img src={ficon} alt="folder icon" />
                  <div>Folder</div>
                </div>
                <div className="text-white" onClick={handleFolderChangeMenu}>
                  {folderName}
                </div>
                {/* change folder */}
                {isChangeFolderVisible && folders && (
                  <div
                    className="folderListContainer absolute h-80 w-70 overflow-auto top-45 left-1/2 transform -translate-x-1/2 bg-black p-2 rounded-md shadow-lg"
                  >
                    <ul className="px-2 flex flex-col gap-0.5 border-2 border-white w-full overflow-x-hidden bg-black scrl">
                      {folders.folders
                        .filter((f) => f !== null)
                        .map((f) => (
                          <li key={f.id}>
                            <button
                              onClick={() => ChangeFolder(f.id)}
                              className="border-2 border-white w-full text-white"
                            >
                              {f.name}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Text Area */}
            <div className="h-full">
              <textarea
                id="body"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "s" && e.ctrlKey) {
                    e.preventDefault();
                    saveNotepad();
                  }
                }}
                // onBlur={saveNotepad}
                className="text-white focus:outline-none h-full w-full"
              />
            </div>
          </div>
        }
      </>
    );
  if (error) return <div className="text-white">There is an error.</div>;
}

export default Notepad;
