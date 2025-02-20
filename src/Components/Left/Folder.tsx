import { useEffect, useState, useContext } from "react";
import fc from '../../assets/folder-close.svg';
import folderIcon from '../../assets/add-folder.svg';
import usePatch from "../../Hooks/usePatch.tsx";
import { NavLink, useParams } from "react-router-dom";
import usePostRequest from "../../Hooks/usePost.tsx";
import Rerender from '../../Context/Context.ts';
import useDelete from '../../Hooks/useDelete';
import { toast } from 'react-toastify';
import useFetchFolder from '../../Hooks/useFetchFolder';

// interface Folder{
//   createdAt:string,
//   deletedAt: string| null,
//   id: string,
//   name: string,
//   updatedAt:string|null
// }

function Folders() {
  const { folderId } = useParams();
  const folder = useFetchFolder();
  const [selectedId, setSelectedId] = useState('');
  // const [data, setData] = useState({...folder.data})
  const render = useContext(Rerender)
  const [isNav, setIsNav] = useState(false);
  const [folderName, setFolderName] = useState('New Folder'); 
  const patchData = usePatch();
  const { postData } = usePostRequest();
  const Delete = useDelete();
  

  // Fetch folders only once when component mounts
  useEffect(() => {
    folder.fetchFolder();
  }, [render.renderRecent]); 


  const changeName = (id: string,name: string) => {
    setFolderName(name);
    setIsNav(true);
    setSelectedId(id);
  };

  // Patch request to save new folder name
  const saveName = async (id: string,name: string) => {
    if (name == "delete") {
      Delete.deleteData(`folders/${id}`)
        .then(() => {toast.success("Folder deleted")
        folder.fetchFolder()})
        .catch(() => toast.error("error while deleting folder"));
      return;
    }
    try {
      await patchData.patchData(`/folders/${id}`, { name: folderName });
      folder.fetchFolder();
    } catch (error) {
      toast.error("Error while changing folder name")
    }
    setIsNav(false);
  };

  if (folder.loading) {
    return (
      <div className='py-7.5 h-54'>
        <div className='px-5 font-semibold text-white h-6.5 pb-2'>Folders</div>
        <p className='text-white'>Loading...</p>
      </div>
    );
  }

  if(folder.data) return (<>
    <div className='flex flex-col flex-1 h-fit'>
      <div className='px-5 pb-2 font-semibold text-white h-6.5 flex flex-row justify-between'>
        Folders 
        <img
          src={folderIcon}
          alt="Add Folder"
          className="cursor-pointer"
          onClick={ () => {
            postData('/folders', { name: "New Folder" })
              .then(() => {
                toast.success('Folder created')
                folder.fetchFolder()})
              .catch(() => toast.error("Error while creating folder"));
          }
          }
        />
      </div>
      <ul className="flex flex-col overflow-y-auto h-50 scrl">

      {folder.data?.folders?.filter((f) => f !== null).map((f) => (
  isNav && selectedId === f.id ? (
    <div className="list" key={f.id}>
      <img className="w-5 h-5" src={fc} alt="Folder Icon" />
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        onBlur={() => saveName(f.id, f.name)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            saveName(f.id, f.name);
          }
        }}
        autoFocus
        className="text-white w-full"
      />
    </div>
  ) : (
    <NavLink
      to={`/folder/${f.id}`}
      key={f.id}
      className={`list ${f.id === folderId ? "activeFolder" : "hover:bg-gray-600"}`}
      onDoubleClick={() => changeName(f.id, f.name)}
    >
      <img className="w-5 h-5" src={fc} alt="Folder Icon" />
      <p className="truncate">{f.name}</p>
    </NavLink>
  )
))}

      </ul>
    </div>
    </>
  );

  if (folder.error) {
    return <p className="text-white">{folder.error.message}</p>;
  }
}

export default Folders;



