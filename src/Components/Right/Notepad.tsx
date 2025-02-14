import React, { useEffect, useState } from "react";
import menu from '../../assets/notepad-menu.svg';
import useFetchNotes from "../../Hooks/useFetchNotes";
import calender from "../../assets/calender-icon.svg";
import ficon from "../../assets/notes-file-icon.svg";
import { useParams } from "react-router-dom";

function Notepad() {
    const { noteId } = useParams();
    const { data, loading, error } = useFetchNotes(`notes/${noteId}`);

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);

    // Handle click outside to close the popup
    const handleClickOutside = (event: any) => {
        if (event.target.closest('.popup-container') || event.target.closest('#menuIcon')) {
            return;
        }
        setPopupVisible(false);
    };

    // Add event listener for outside click
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (data) {
            setText(data.note.content);
            setTitle(data.note.title);
        }
    }, [data]);

    if (loading) return <h1 className="text-white">Loading...</h1>;

    const handleMenuClick = () => {
        setPopupVisible((prev) => !prev);
    };

    const handleOptionClick = (option: string) => {
        console.log(`${option} clicked`); // Handle the selected option here
        setPopupVisible(false); // Close the popup after clicking an option
    };

    if (error) return <div>There was an error.</div>;

    return (
        <>
            {data && (
                <div className="p-12 h-full w-full flex flex-col gap-7.5">
                    {/* Top */}
                    <div className="flex flex-row justify-between h-10">
                        {data && (
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-white text-5xl focus:outline-none"
                            />
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
                            <div>{data.note.updatedAt}</div>
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
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="text-white focus:outline-none h-full w-full"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Notepad;
