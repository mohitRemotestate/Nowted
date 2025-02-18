import React, { useState, useEffect } from "react";
import useFetchNotes from "./Hooks/useFetchNotes";
import { NavLink, useParams } from "react-router-dom";
interface Folder {
  id: number;
  name: string;
}

interface FolderData {
  folders: Folder[];
}

function Mid() {
  const { folderId, noteId } = useParams();

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const folderList = useFetchNotes(); //just for folder name
  const [page, setPage] = useState(1);
  const [isDeleted, setIsDeleted] = useState("");

  const [folderName, setFolderName] = useState("");
  const [url, setUrl] = useState({
    favorite: undefined as boolean | undefined,
    archived: false,
    deleted: false,
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    folderList.fetchData("folders");
  }, [folderId]);

  const notes = useFetchNotes();
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
    notes.fetchNotes(url);
  }, [url]);

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
    if (folderId) {
      if (folderId === "trash") {
        setFolderName("Trash");
      } else if (folderId === "favorite") {
        setFolderName("favorite");
      } else if (folderId === "archived") {
        setFolderName("Archived Notes");
      } else if (folderList.data) {
        const id = folderList.data.folders.find((i) => i.id === folderId);
        setFolderName(id ? id.name : "");
      }
    } else {
      setFolderName("All Files");
    }
  }, [folderId]);

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
                data.notes.length > 0 &&
                data.notes.map((f: any) => (
                  <NavLink
                    to={`/folder/${folderId}/note/${f.id}`
                      // more == "undefined"
                      //   ? 
                        
                        // : `${more}/${f.id}`
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
