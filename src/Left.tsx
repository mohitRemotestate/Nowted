
import { useState } from 'react';
import logo from './assets/logo.svg';
import searchIcon from './assets/search-icon.svg';
import srch from './assets/searching.svg';
import Recent from './Components/Left/Recent.tsx';
import Folders from './Components/Left/Folder.tsx';
import More from './Components/Left/More.tsx';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDebounce } from './Hooks/useDebounce';
import { useEffect } from 'react';
import useFetchNote from './Hooks/useFetchNote';

const MainSideBar: React.FC = () => {
  const { folderId } = useParams();
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const [searchRequest, setSearchRequest] = useState('');
  const fetchSearchList = useFetchNote();
  const [srchList, setSrchList] = useState(fetchSearchList.data);
  const debounce = useDebounce(searchRequest);

  const handleClick = () => {
    if (folderId && !['trash', 'favorite', 'archived'].includes(folderId)) {
      navigate(`/folder/${folderId}/note/newnote`);
    } else {
      toast.warn('Select folder first');
    }
  };
   
  useEffect(()=>{
    if(debounce){
      fetchSearchList.fetchNote({debounce}).then(()=>setSrchList(fetchSearchList.data))
    }
    else setSrchList(null);
    console.log(srchList);
  },[debounce])

  useEffect(()=>{

  },[fetchSearchList.data])

  const ReadingSearchInput = (e: any) => {
    setSearchRequest(e.target.value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between px-5 py-7.5">
        <img src={logo} />
        <img src={searchIcon} onClick={() => setIsSearch((p) => !p)} />
      </div>

      {/* Search and new file */}
      <div className="px-5" id="isSearch">
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
              
              <div className="searchListContainer scrl absolute top-35 left-0 w-50 bg-gray-800 text-white rounded-md shadow-lg overflow-y-auto max-h-42 ">
                <ul>
                  {srchList?.notes.map((i) => (
                    <NavLink
                      to={`/folder/${i.folder.id}/note/${i.id}`}
                      key={i.id}
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
      <div className="flex flex-col">
        {/* Recents */}
        <Recent />

        {/* Folders */}
        <Folders />

        {/* More */}
        <More />
      </div>
    </div>
  );
};

export default MainSideBar;

