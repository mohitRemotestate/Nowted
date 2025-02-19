import  { useEffect, useState,useContext } from 'react';
import doc from '../../assets/doc-icon.svg';
import useFetchRecent from "../../Hooks/useFetchRecent";
import { NavLink, useParams } from 'react-router-dom';
import Rerender from '../../Context/Context';
import { ToastContainer, toast } from 'react-toastify';

function Recent() {
  const { noteId } = useParams();
  const {data: recentData,loading,error,fetchRecent} = useFetchRecent();
  const render = useContext(Rerender);
  const [data,setData] = useState(recentData)

useEffect(()=>{
  fetchRecent();
  if(error){
    ()=>toast.error('error while fetching data', 
    {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  }
},[render.renderRecent,error])

// console.log(render.renderRecent)

useEffect(()=>{
  setData(recentData)
},[recentData])
 

  if (loading) {
    return (
      <div className="py-7.5 h-54">
        <div className="px-5 font-semibold text-white h-6.5 pb-2">Recents</div>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (<>
    <p className="text-red-500">{error}</p>;
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </>
    )
  }

  if(data) return (
    <div className="py-7.5 h-54">
      <div className="px-5 font-semibold text-white h-6.5 pb-2">Recents</div>
      {data?.recentNotes?.length > 0 ? (
        <ul>
          {data.recentNotes.map((rec: any) => (
            <NavLink
              to={`/folder/${rec.folder?.id}/note/${rec.id}`}
              key={rec.id}
              className={`list recent ${
                rec.id == noteId ? "active" : "hover:bg-gray-600"
              } `}
            >
              <img className="w-5 h-5" src={doc} alt="doc icon" />
              <p className="truncate">{rec.title}</p>
            </NavLink>
          ))}
        </ul>
      ) : (
        <p className="text-white px-5">No recent notes available</p>
      )}
    </div>
  );
}

export default Recent;
