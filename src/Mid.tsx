import { useState, useEffect,useContext } from "react";
import useFetchNote from "./Hooks/useFetchNote";
import { NavLink, useParams } from "react-router-dom";
import Rerender from './Context/Context';
import useFetchFolder from "./Hooks/useFetchFolder";


function Mid() {
  const { folderId, noteId } = useParams();
  const render = useContext(Rerender);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error|undefined>();
  const folderList = useFetchFolder(); //just for folder name
  const note = useFetchNote();
  const [data, setData] = useState(note.data); //data of folder list 
  const page = 1;

  const [folderName, setFolderName] = useState<string>("");
  const [url, setUrl] = useState({
    favorite: undefined as boolean | undefined,
    archived: false,
    deleted: false,
    page: 1,
    limit: 10,
  });


  //folder name
  useEffect(() => {
    if (folderId) {
      if (folderId === "trash") {
        setFolderName("Trash");
      } else if (folderId === "favorite") {
        setFolderName("Favorite");
      } else if (folderId === "archived") {
        setFolderName("Archived Notes");
      } else if (folderList.data) {
        const id = folderList.data.folders.find((i) => i?.id === folderId);
        setFolderName(id ? id.name : "");
      }
    } else {
      setFolderName("All Files");
    }
  }, [folderId, folderList]);

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
    note.fetchNote(url);
  }, [url, render.renderRecent]);

  useEffect(() => {
    if (note.data) {
      // console.log(notes);
      setData(note.data);

      // setData((prev)=>{
      //   if(!prev) return note.data
      //   return {
      //     ...prev, 
      //     notes: [...prev?.notes, ...(note?.data?.notes || [])],
      //     total: note?.data?.total
      //   }});
      setLoading(note.loading);
      setError(note.error);
    }
  }, [note.data, note.loading, note.error]);

  //folder name
  

  if (loading)
    return <h1 className="h-22 py-7.5 px-5 text-white">Loading...</h1>;
  
    if (data) return (
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
            <ul className="overflow-y-auto h-212 scrl py-7.5 flex flex-col gap-2.5">
              {data && data?.notes.length > 0 ? (
                data &&
                data?.notes.map((f) => (
                  <NavLink
                    to={`/folder/${folderId}/note/${f.id}`}
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
                <div className=" h-24.5 p-5 text-white w-full font-sans font-semibold text-lg">
                  Folder is empty
                </div>
              )}
            </ul>
          </div>

          <div className="flex flex-row justify-around ">
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
                  if (url.page < Math.ceil(data?.total / 10)) {
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
      </>
    );

  if (error) return <>{error}</>;
}

export default Mid;
