import { useState, useEffect,useContext } from "react";
import useFetchNote from "./Hooks/useFetchNote";
import { NavLink, useParams } from "react-router-dom";
import Rerender from './Context/Context';
import useFetchFolder from "./Hooks/useFetchFolder";


interface FolderObjectType {
  createdAt:string,
  deletedAt:string|null,
  id:string,
  name:string,
  updatedAt:string
}



function Mid() {
  const { folderId, noteId } = useParams();
  const render = useContext(Rerender);

  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const folderList = useFetchFolder(); //just for folder name
  const page = 1;
  const notes = useFetchNote();

  const [folderName, setFolderName] = useState<string>("");
  const [url, setUrl] = useState({
    favorite: undefined as boolean | undefined,
    archived: false,
    deleted: false,
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    folderList.fetchFolder();
  }, [folderId, render.renderRecent]);

  
  
  useEffect(() => {
    setUrl({
      ...url,
      favorite: folderId == "favorite" ? true : undefined,
      archived: folderId == "archived" ? true : false,
      deleted: folderId == "trash" ? true : false,
      page,
    });
  }, [folderId]);

  useEffect(() => {
    notes.fetchNote(url);
  }, [url,render.renderRecent]);

  useEffect(() => {
    if (notes.data) {
      // console.log(notes);
      setData(notes.data);
      setLoading(notes.loading);
      setError(notes.error);
    }
  }, [notes.data, notes.loading, notes.error]);

  //folder name
  useEffect(() => {
    // console.log(folderList)
    if (folderId) {
      if (folderId === "trash") {
        setFolderName("Trash");
      } else if (folderId === "favorite") {
        setFolderName("Favorite");
      } else if (folderId === "archived") {
        setFolderName("Archived Notes");
      } else if (folderList.data) {
        const id = folderList.data.folders.find((i:FolderObjectType) => i.id === folderId);
        setFolderName(id ? id.name : "");
      }
    } else {
      setFolderName("All Files");
    }
  }, [folderId,folderList]);

  if (loading)
    return <h1 className="h-22 py-7.5 px-5 text-white">Loading...</h1>;
  if (data)
    return (
      <>
        <div className="h-22 py-7.5 px-5">
          {/* folder name */}
          <div className="w-75 h-7  border- ">
            <p className="text-white font-sens  font-semibold h-7 text-2xl ">
              {folderName}
            </p>
          </div>

          {/* list of items */}
          <div className="flex flex-col gap-8">
            <ul className="overflow-y-auto h-215.5 scrl py-7.5 flex flex-col gap-2.5">
              {data.notes.length > 0 ? (
                data.notes.map((f: any) => (
                  <NavLink
                    to={`/folder/${folderId}/note/${f.id}`
                    }
                    key={f.id}
                    // onClick={ClickActivity}
                    className={`h-24.5 p-5 text-white flex flex-col gap-2 ${
                      f.id == noteId ? "activemid" : "mid"
                    }`}
                  >
                    <div className="truncate w-full h-7 font-sans font-semibold text-lg">
                      {f.title}
                    </div>
                    <div className="flex flex-row gap-2.5">
                      <div>21/06/2022</div>
                      <div className="truncate">{f.preview}</div>
                    </div>
                  </NavLink>
                ))
              ) : (
                <div className=" h-24.5 p-5 text-white w-full h-7 font-sans font-semibold text-lg">
                  Folder is empty
                </div>
              )}
            </ul>

            <div className="flex flex-row justify-around">
              <button
                type="button"
                key="prev"
                onClick={() => {
                  // console.log(url.page)
                  if (url.page > 1) {
                    const page = url.page;
                    setUrl({ ...url, page: page - 1 });
                    // console.log(url.page)
                  }
                }}
                className="text-white border-purple-900 bg-purple-800 border-2 rounded-xl p-3"
              >
                Prev
              </button>
              <button
                type="button"
                key="next"
                onClick={() => {
                  // console.log(url.page)
                  if (url.page < Math.ceil(data.total / 10)) {
                    const page = url.page;
                    setUrl({ ...url, page: page + 1 });
                    // console.log(url.page)
                  }
                }}
                className="text-white border-purple-900 border-2 bg-purple-800 rounded-xl p-3"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    );

  if (error) return <>{error}</>;
}

export default Mid;
