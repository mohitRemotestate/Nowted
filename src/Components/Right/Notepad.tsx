import React, { useEffect, useState } from "react";
import menu from '../../assets/notepad-menu.svg';
import calender from "../../assets/calender-icon.svg";
import ficon from "../../assets/notes-file-icon.svg";
import useFetchNotes from "../../Hooks/useFetchNotes";
import { useParams } from "react-router-dom";
import usePatch from "../../Hooks/usePatch.tsx";

function Notepad() {
    const { noteId } = useParams();
    const { data, loading, error } = useFetchNotes(`notes/${noteId}`);
    const Patch = usePatch()
//data, loading, error
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [isArchived,setisArchived] = useState(false)
    const [isFavorite, setIsFavourite] = useState(false)
    const [popupVisible, setPopupVisible] = useState(false);
    const [isEditable, setIsEditable] = useState(false)

    const handleClickOutside = (event: any) => {
        if (event.target.closest('.popup-container') || event.target.closest('#menuIcon')) {
            return;
        }
        setPopupVisible(false);
    };

    const date = data ? new Date(data.note.updatedAt).toISOString().split('T')[0] : '';

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (data) {
            setContent(data.note.content);
            setTitle(data.note.title);
        }
    }, [data]);

    
    const handleMenuClick = () => {
        setPopupVisible((prev) => !prev);
    };
    
    const handleOptionClick = (option: string) => {
                switch (option) {
                    case 'Archived':
                        setisArchived(!isArchived);
                        Patch.patchData(`notes/${data.note.id}`, {
                            title,
                            content,
                            isArchived,
                        })
                        break;
                    case 'Favorite':
                        setIsFavourite(!isFavorite);
                        Patch.patchData(`notes/${data.note.id}`, {
                            title,
                            content,
                            isFavorite//added title and content so that these become extra button to save data
                        })
                        break;
                    case 'Delete':
                        // handle delete logic here
                        break;
                    default:
                        break;
                }
                setPopupVisible(false);
            };
    
            function saveNotepad() {
                Patch.patchData(`notes/${data.note.id}`, {
                    title,
                    content,
                    isArchived,
                    isFavorite
                }).then(() => {
                    setIsEditable(false);
                }).catch((error) => {
                    console.error("Error updating note:", error);
                });
            }
            
    if (loading) return <h1 className="text-white">Loading...</h1>
    
    if(data) return (
        <>
            {(
                <div className="p-12 h-full w-full flex flex-col gap-7.5 ">
                    {/* Top */}
                    <div className="flex flex-row justify-between h-10">
                        {isEditable?
                        (
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={(e)=>{
                                    if(e.key === "Enter") saveNotepad()
                                }}
                                onBlur={saveNotepad}
                                autoFocus
                                className="text-white text-4xl font-bold h-10 w-full focus:outline-none"
                            />
                        ):(
                            <span 
                            onClick={()=>setIsEditable(true)}
                            className="text-white h-10 truncate font-bold w-full text-4xl" >{title}</span>
                        )}
                        <div id="menuIcon" onClick={handleMenuClick}>
                            <img src={menu} alt="menu" />
                        </div>
                    </div>

                    {/* Popup for options */}
                    {popupVisible && (
                        <div
                            className="popup-container absolute right-19 top-20 bg-slate-500 text-black w-36 h-50 flex flex-col items-center justify-center border rounded-md shadow-md"
                        >
                            <button
                                onClick={() => handleOptionClick("Archived")}
                                className="py-2 px-4 w-full text-left hover:bg-gray-200"
                            >
                                Archived
                            </button>
                            <button
                                onClick={() => handleOptionClick("Favorite")}
                                className="py-2 px-4 w-full text-left hover:bg-gray-200"
                            >
                                Favorite
                            </button>
                            <button
                                onClick={() => handleOptionClick("Delete")}
                                className="py-2 px-4 w-full text-left hover:bg-gray-200"
                            >
                                Delete
                            </button>
                        </div>
                    )}

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
                            <div className="text-white">{data.note.folder.name}</div>
                        </div>
                    </div>

                    {/* Text Area */}
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
            )}
        </>
    );
    if (error) return <div>There was an error.</div>;
}

export default Notepad;
