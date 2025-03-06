// import { useState, useEffect, useContext } from "react";
// import useFetchNote, { Note } from "./Hooks/useFetchNote";
// import { NavLink, useParams } from "react-router-dom";
// import Rerender from "./Context/Context";
// import useFetchFolder from "./Hooks/useFetchFolder";

// function Mid() {
//   const { folderId, noteId } = useParams();
//   const render = useContext(Rerender);
//   // const [notes, setNotes] = useState([]);
//   // const [isloading, setLoading] = useState<boolean>(true);
//   // const [iserror, setError] = useState<Error | undefined>();
//   const {data: folderListData, fetchFolder:folderListFetchFolder} = useFetchFolder(); //just for folder name
//   const { data: NoteData, loading, error, fetchNote } = useFetchNote();
//   const [data, setData] = useState<Note[]>([]); //data of folder list
//   const [page, setPage] = useState(1);
//   const [prevFolderId, setPrevFolderId] = useState(folderId)
//   const [totalItem, setTotalItem] = useState(NoteData?.total);
//   const [url, setUrl] = useState({});
//   // const midNoteList = [...note.data?.notes];

//   // const [folderName, setFolderName] = useState<string>("");

//   //to fetch the list of folder
//   // const folderListMemoized = useMemo(
//   //   () => folderList,
//   //   [folderId, render.renderRecent]
//   // );

//   useEffect(() => {
//     folderListFetchFolder();
//   }, [folderId, folderListFetchFolder, render.renderRecent]);

//   //folder name
//   useEffect(() => {
//     if (folderId) {
//       if (folderId === "trash") {
//         render.setFolderName("Trash");
//       } else if (folderId === "favorite") {
//         render.setFolderName("Favorite");
//       } else if (folderId === "archived") {
//         render.setFolderName("Archived Notes");
//       } else if (folderListData) {
//         const id = folderListData.folders.find((i) => i?.id === folderId);
//         render.setFolderName(id ? id.name : "");
//       }
//     } else {
//       render.setFolderName("All Files");
//     }
//   }, [folderId, folderListData, render]);

//   useEffect(() => {
//     setUrl({
//       favorite: folderId == "favorite" ? true : undefined,
//       archived: folderId == "archived" ? true : false,
//       deleted: folderId == "trash" ? true : false,
//       page,
//       limit: 10,
//     });
//     // setData([]);
//   }, [folderId, page]);

//   useEffect(() => {
//     fetchNote(url);
//   }, [url, render.renderRecent, fetchNote]);

//   useEffect(() => {
//     if (NoteData) {
//       setTotalItem(NoteData.total);
  
//       if (folderId !== prevFolderId) {
//         setData(NoteData.notes || []);
//       } else {
//         setData((prev) => {
//           const newNotes = NoteData.notes || [];
//           const combinedNotes = [...prev, ...newNotes];
  
//           const uniqueNotes = combinedNotes.filter(
//             (note, index, self) => index === self.findIndex((n) => n.id === note.id)
//           );
  
//           return uniqueNotes;
//         });
//       }
  
//       setPrevFolderId(folderId);
//     }
//   }, [NoteData, page, folderId, prevFolderId]); 
  

//   if (loading)
//     return <h1 className="h-22 py-7.5 px-5 text-white">Loading...</h1>;

//   if (data)
//     return (
//       <>
//         <div className="w-full h-22 py-7.5 px-5">
//           {/* folder name */}
//           <div className="w-75 h-7  border- ">
//             <p className="text-white font-sens  font-semibold h-7 text-2xl ">
//               {render.folderName}
//             </p>
//           </div>

//           {/* list of items */}
//           <div className="flex flex-col gap-8">
//             <ul className="overflow-y-auto h-212 scrl py-7.5 flex flex-col gap-2.5">
//               {data && data?.length > 0 ? (
//                 data &&
//                 data?.map((f) => (
//                   <li key={f.id}>
//                     <NavLink
//                       to={`/folder/${folderId}/note/${f.id}`}
//                       // onClick={ClickActivity}
//                       className={`h-24.5 p-5 text-white flex flex-col gap-2 ${
//                         f.id == noteId ? "activemid" : "mid"
//                       }`}
//                     >
//                       <div className="truncate w-full h-7 font-sans font-semibold text-lg">
//                         {f.title}
//                       </div>
//                       <div className="flex flex-row gap-2.5">
//                         <div>21/06/2022</div>
//                         <div className="truncate">{f.preview}</div>
//                       </div>
//                     </NavLink>
//                   </li>
//                 ))
//               ) : (
//                 <div
//                   key={"5"}
//                   className=" h-24.5 p-5 text-white w-full font-sans font-semibold text-lg"
//                 >
//                   Folder is empty
//                 </div>
//               )}
//               {totalItem && totalItem > data.length && (
//                 <div className="flex flex-row justify-around ">
//                   <button
//                     className="text-white border-white bg-black border-2 rounded-xl p-3"
//                     onClick={() => {
//                       setPage((pre) => pre + 1);
//                     }}
//                   >
//                     Load More
//                   </button>
//                 </div>
//               )}
//             </ul>
//           </div>
//           {/* <button
//                 type="button"
//                 key="prev"
//                 onClick={() => {
//                   // console.log(url.page)
//                   if (url.page > 1) {
//                     const page = url.page;
//                     setUrl({ ...url, page: page - 1 });
//                     // console.log(url.page)
//                   }
//                 }}
//                 className="text-white border-purple-900 bg-purple-800 border-2 rounded-xl p-3"
//               >
//                 Prev
//               </button>
//               <button
//                 type="button"
//                 key="next"
//                 onClick={() => {
//                   // console.log(url.page)
//                   if (url.page < Math.ceil(data?.total / 10)) {
//                     const page = url.page;
//                     setUrl({ ...url, page: page + 1 });
//                     // console.log(url.page)
//                   }
//                 }}
//                 className="text-white border-purple-900 border-2 bg-purple-800 rounded-xl p-3"
//               >
//                 Next
//               </button> */}
//         </div>
//       </>
//     );

//   if (error) return <>{error}</>;
// }

// export default Mid;
import { useState, useEffect, useContext } from "react";
import useFetchNote, { Note } from "./Hooks/useFetchNote";
import { NavLink, useParams } from "react-router-dom";
import Rerender from "./Context/Context";
import useFetchFolder from "./Hooks/useFetchFolder";

function Mid() {
  const { folderId, noteId } = useParams();
  const render = useContext(Rerender);
  // const [notes, setNotes] = useState([]);
  // const [isloading, setLoading] = useState<boolean>(true);
  // const [iserror, setError] = useState<Error | undefined>();
  const {data: folderListData, fetchFolder:folderListFetchFolder} = useFetchFolder(); //just for folder name
  const { data: NoteData, loading, error, fetchNote } = useFetchNote();
  const [data, setData] = useState<Note[]>([]); //data of folder list
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(NoteData?.total);
  // const midNoteList = [...note.data?.notes];

  // const [folderName, setFolderName] = useState<string>("");
  const [url, setUrl] = useState({
    // favorite: undefined as boolean | undefined,
    // archived: false,
    // deleted: false,
    // page: 1,
    // limit: 10,
  });

  //to fetch the list of folder
  // const folderListMemoized = useMemo(
  //   () => folderList,
  //   [folderId, render.renderRecent]
  // );

  useEffect(() => {
    folderListFetchFolder();
  }, [folderId, folderListFetchFolder, render.renderRecent]);

  //folder name
  useEffect(() => {
    if (folderId) {
      if (folderId === "trash") {
        render.setFolderName("Trash");
      } else if (folderId === "favorite") {
        render.setFolderName("Favorite");
      } else if (folderId === "archived") {
        render.setFolderName("Archived Notes");
      } else if (folderListData) {
        const id = folderListData.folders.find((i) => i?.id === folderId);
        render.setFolderName(id ? id.name : "");
      }
    } else {
      render.setFolderName("All Files");
    }
  }, [folderId, folderListData, render]);

  useEffect(() => {
    setUrl({
      favorite: folderId == "favorite" ? true : undefined,
      archived: folderId == "archived" ? true : false,
      deleted: folderId == "trash" ? true : false,
      page,
      limit: 10,
    });
    setData([]);
  }, [folderId, page]);

  useEffect(() => {
    fetchNote(url);
  }, [url, render.renderRecent, fetchNote]);

  useEffect(() => {
    if (NoteData) {
      setTotalItem(NoteData.total);
      console.log("Page: " + page);
      // if (page === 1) setData(NoteData.notes);
      // else {
      //   setData((prev) => {
      //     return [...prev, ...(NoteData ? NoteData.notes : [])];
      //   });
      // }
      setData((prev) => {
        // if (prev.length === 0) {
        //   return NoteData ? NoteData.notes : [];
        // } else {
        //   return [...prev, ...(NoteData ? NoteData.notes : [])];
        // }

        const newNotes = NoteData ? NoteData.notes : [];

        const combinedNotes = [...prev, ...newNotes];

        const uniqueNotes = combinedNotes.filter(
          (note, index, self) =>
            index === self.findIndex((n) => n.id === note.id)
        );

        return uniqueNotes;
      });
      // console.log(NoteData.notes);
      // setLoading(note.loading);
      // setError(note.error);
    }
  }, [NoteData, page]);

  //folder name

  if (loading)
    return <h1 className="h-22 py-7.5 px-5 text-white">Loading...</h1>;

  if (data)
    return (
      <>
        <div className="w-full h-22 py-7.5 px-5">
          {/* folder name */}
          <div className="w-75 h-7  border- ">
            <p className="text-white font-sens  font-semibold h-7 text-2xl ">
              {render.folderName}
            </p>
          </div>

          {/* list of items */}
          <div className="flex flex-col gap-8">
            <ul className="overflow-y-auto h-212 scrl py-7.5 flex flex-col gap-2.5">
              {data && data?.length > 0 ? (
                data &&
                data?.map((f) => (
                  <li key={f.id}>
                    <NavLink
                      to={`/folder/${folderId}/note/${f.id}`}
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
                  </li>
                ))
              ) : (
                <div
                  key={"5"}
                  className=" h-24.5 p-5 text-white w-full font-sans font-semibold text-lg"
                >
                  Folder is empty
                </div>
              )}
              {totalItem && totalItem > data.length && (
                <div className="flex flex-row justify-around ">
                  <button
                    className="text-white border-white bg-black border-2 rounded-xl p-3"
                    onClick={() => {
                      setPage((pre) => pre + 1);
                    }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </ul>
          </div>
          {/* <button
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
              </button> */}
        </div>
      </>
    );

  if (error) return <>{error}</>;
}

export default Mid;