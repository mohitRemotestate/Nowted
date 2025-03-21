import { useState } from "react";
import logo from "./assets/logo.svg";
import searchIcon from "./assets/search-icon.svg";
import srch from "./assets/searching.svg";
import Recent from "./Components/Left/Recent.tsx";
import Folders from "./Components/Left/Folder.tsx";
import More from "./Components/Left/More.tsx";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "./Hooks/useDebounce";
import { useEffect } from "react";
import useFetchNote from "./Hooks/useFetchNote";

const MainSideBar: React.FC = () => {
  const { folderId } = useParams();
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const [searchRequest, setSearchRequest] = useState("");
  const { data: fetchSearchListData, fetchNote: fetchSearchListFetchNote } =
    useFetchNote();
  const [srchList, setSrchList] = useState(fetchSearchListData);
  const debounce = useDebounce(searchRequest);
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    //condition of not closing searchbar
    if (target.closest(".searchListContainer")) {
      return;
    }
    setIsSearch(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (folderId && !["trash", "favorite", "archived"].includes(folderId)) {
      navigate(`/folder/${folderId}/note/newnote`);
    } else {
      toast.warn("Select folder first");
    }
  };

  useEffect(() => {
    if (debounce) {
      fetchSearchListFetchNote({ debounce }).then(() =>
        setSrchList(fetchSearchListData)
      );
    } else setSrchList(null);
    // console.log(srchList);
  }, [debounce, fetchSearchListData, fetchSearchListFetchNote]);

  useEffect(() => {}, [fetchSearchListData]);

  const ReadingSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRequest(e.target.value);
  };

  return (
    <div className="flex flex-col w-1/5 h-full bg-left">
      <div className="flex flex-col h-2/15">
        <div className="flex justify-between px-5 py-7.5">
          <img src={logo} />
          <img
            src={searchIcon}
            className="searchListContainer"
            onClick={() => setIsSearch((p) => !p)}
          />
        </div>

        {/* Search and new file */}
        <div className="searchListContainer px-5" id="isSearch">
          {isSearch ? (
            <div className="border-natural-800 btn rounded-xs flex flex-row gap-2 p-2.5 h-10 w-full">
              <div>
                <img src={srch} />
              </div>
              <input
                type="text"
                className="border-white rounded-xs text-white w-full focus:outline-none"
                placeholder="Search note"
                value={searchRequest}
                onChange={ReadingSearchInput}
              />
              {
                <div className="searchListContainer scrl absolute top-35 left-10 w-50 bg-gray-800 text-white rounded-md shadow-lg overflow-y-auto overflow-x-hidden max-h-42 ">
                  <ul>
                    {srchList?.notes.map((i) => (
                      <NavLink
                        to={`/folder/${i.folder.id}/note/${i.id}`}
                        key={i.id}
                        onClick={() => {
                          const prev = !isSearch;
                          setIsSearch(prev);
                        }}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        {i.title}
                      </NavLink>
                    ))}
                  </ul>
                </div>
              }
            </div>
          ) : (
            <button
              type="button"
              onClick={handleClick}
              className="border-natural-800 rounded-xs btn text-white w-full h-10 font-sans font-semibold"
            >
              + New Note
            </button>
          )}
        </div>
      </div>

      {/* Recents */}
      <Recent />

      {/* Folders */}
      <Folders />

      {/* More */}
      <More />
    </div>
  );
};

export default MainSideBar;
