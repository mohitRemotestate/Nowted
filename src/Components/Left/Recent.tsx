import React, { useEffect } from 'react';
import doc from '../../assets/doc-icon.svg';
import useFetchNotes from "../../Hooks/useFetchNotes";
import { NavLink, useParams } from 'react-router-dom';

function Recent(Renderlist) {
  const { folderId, noteId } = useParams();
  const recent = useFetchNotes();

  // console.log(Renderlist,"in recent ")
  useEffect(() => {
    recent.fetchData("notes/recent");
  }, [Renderlist.recentRender]); 

  if (recent.loading) {
    return (
      <div className="py-7.5 h-54">
        <div className="px-5 font-semibold text-white h-6.5 pb-2">Recents</div>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (recent.error) {
    return <p className="text-red-500">{recent.error}</p>;
  }

  return (
    <div className="py-7.5 h-54">
      <div className="px-5 font-semibold text-white h-6.5 pb-2">Recents</div>
      {recent.data?.recentNotes?.length > 0 ? (
        <ul>
          {recent.data.recentNotes.map((rec: any) => (
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
