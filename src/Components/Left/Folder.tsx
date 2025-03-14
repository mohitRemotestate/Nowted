import { useEffect, useState, useContext } from "react";
import fc from "../../assets/folder-close.svg";
import folderIcon from "../../assets/add-folder.svg";
import usePatch from "../../Hooks/usePatch.tsx";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import usePostRequest from "../../Hooks/usePost.tsx";
import Rerender from "../../Context/Context.ts";
import useDelete from "../../Hooks/useDelete";
import { toast } from "react-toastify";
import useFetchFolder from "../../Hooks/useFetchFolder";
import trash from "../../assets/trash.svg";

function Folders() {
  const { folderId } = useParams();
  const {fetchFolder,data:folderData, error: folderError, loading:folderLoading} = useFetchFolder();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("");
  // const [data, setData] = useState({...folder.data})
  const render = useContext(Rerender);
  const [isNav, setIsNav] = useState(false);
  const [folderName, setFolderName] = useState("New Folder");
  const patchData = usePatch();
  const { postData } = usePostRequest();
  const Delete = useDelete();

  // Fetch folders only once when component mounts
  useEffect(() => {
    fetchFolder();
  }, [fetchFolder, folderId]);

  const changeName = (id: string, name: string) => {
    setFolderName(name);
    setIsNav(true);
    setSelectedId(id);
  };

  // Patch request to save new folder name
  const saveName = async (id: string) => {
    try {
      await patchData.patchData(`/folders/${id}`, { name: folderName });
      fetchFolder();
    } catch (e) {
      console.log(e);
      toast.error("Error while changing folder name");
    }
    setIsNav(false);
  };

  function deleteFolder(id: string) {
    Delete.deleteData(`folders/${id}`)
      .then(() => {
        toast.success("Folder deleted");
        fetchFolder();
        navigate("/");
      })
      .catch(() => toast.error("error while deleting folder"));
  }

  if (folderLoading) {
    return (
      <div className="py-7.5 h-54">
        <div className="px-5 font-semibold text-white h-6.5 pb-2">Folders</div>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (folderData)
    return (
      <div className="flex flex-1 overflow-hidden w-full h-full">
        <div className="flex flex-col w-full">
          <div className="px-5 pb-2 font-semibold text-white h-1/15 flex flex-row justify-between">
            <p>Folders</p>
            <button>
              <img
                src={folderIcon}
                alt="Add Folder"
                className="cursor-pointer"
                onClick={() => {
                  postData("/folders", { name: "New Folder" })
                    .then(() => {
                      toast.success("Folder created");
                      fetchFolder();
                    })
                    .catch(() => toast.error("Error while creating folder"));
                }}
              />
            </button>
          </div>
          <ul className="flex flex-1 flex-col overflow-y-auto scrl">
            {folderData?.folders
              ?.filter((f) => f !== null)
              .map((f) =>
                isNav && selectedId === f.id ? (
                  <li className="list" key={f.id}>
                    <img className="w-5 h-5" src={fc} alt="Folder Icon" />
                    <input
                      type="text"
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      onBlur={() => saveName(f.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveName(f.id);
                        }
                      }}
                      autoFocus
                      className="text-white w-full"
                    />
                  </li>
                ) : (
                  <div
                    className="flex flex-row justify-between pr-4"
                    key={f.id}
                  >
                    <NavLink
                      to={`/folder/${f.id}`}
                      onClick={() => render.setFolderName(f.name)}
                      className={`list w-full ${
                        f.id === folderId ? "activeFolder" : "hover:bg-gray-600"
                      }`}
                      onDoubleClick={() => changeName(f.id, f.name)}
                    >
                      <img className="w-5 h-5" src={fc} alt="Folder Icon" />
                      <p className="truncate">{f.name}</p>
                    </NavLink>
                    <button>
                      <img
                        src={trash}
                        className="py-2.5"
                        alt="delete icon"
                        onClick={() => deleteFolder(f.id)}
                      />
                    </button>
                  </div>
                )
              )}
          </ul>
        </div>
      </div>
    );

  if (folderError) {
    return <p className="text-white">{folderError.message}</p>;
  }
}

export default Folders;
