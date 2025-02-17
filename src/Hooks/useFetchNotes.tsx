// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Folders from '../Components/Left/Folder';

// const AxiosApi = axios.create({
//   baseURL: 'https://nowted-server.remotestate.com',
// });

// const useFetchNotes = (endpoint: string, params?: object) => {
//   const { folderId, noteId } = useParams();
//   const foldername = ()=>{
//     if(folderId == "trash" || folderId == "favorite" || folderId == "archived") return null;
//     else return folderId;
//   }

//   const mergedParams = { ...params, folderId : foldername() };

//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<any>(false);

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await AxiosApi.get(`/${endpoint}`, {
//         params: mergedParams,
//       });
//       setData(response.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [endpoint, folderId]);

//   const fetchNotes = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await AxiosApi.get('/notes', {
//         params: {...mergedParams },
//       });
//       setData(response.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [folderId]);

//   const fetchSingleNote = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await AxiosApi.get(`/notes/${noteId}`, {
//         params: mergedParams
//       });
//       setData(response.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [noteId, params]);

//   // Trigger fetchData or fetchNotes based on the endpoint
//   useEffect(() => {
//     if (endpoint == 'notes/recent') fetchData();
//     if (endpoint == 'folders') fetchData();
//   }, [endpoint]);

//   useEffect(() => {
//     if (endpoint == 'notes') fetchNotes();
//   }, [folderId]);

//   useEffect(() => {
//     if (endpoint == `notes/${noteId}`) fetchSingleNote();
//   }, [noteId]);

//   // refetch function to manually trigger the fetch
//   const refetch = useCallback(() => {
//     if (endpoint == 'notes/recent') fetchData();
//     if (endpoint == 'folders') fetchData();
//     if (endpoint == 'notes') fetchNotes();
//     if (endpoint == `notes/${noteId}`) fetchSingleNote();
//   }, []);

//   return { data, loading, error, refetch };
// };

// export default useFetchNotes;

//fetchData - to fetch notes/recent and folders info
//fetch singlenote {when note id is mentioned}- to fetch info of a single note 
//fetch notes params to access particular file
//notes - will have params
//notes/${noteId} have value from noteid

import { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

const useFetchNotes = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { folderId, noteId } = useParams();

  // Memoized folder name
  const folderName = useMemo(() => {
    return folderId === "trash" || folderId === "favorite" || folderId === "archived"
      ? undefined
      : folderId;
  }, [folderId]);

  const memoizedParams = useMemo(() => ({
    folderId: folderName,
  }), [folderName]);

  // Fetch generic data (folders, recent notes)
  const fetchData = useCallback(async (endpoint: string) => {
    setLoading(true);
    try {
      const response = await AxiosApi.get(`/${endpoint}`);
      setData(response.data);
    } catch (err) {
      setError((err as any).response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch details of a single note
  const fetchSingleNote = useCallback(async () => {
    if (!noteId) return;
    setLoading(true);
    try {
      const response = await AxiosApi.get(`/notes/${noteId}`);
      setData(response.data);
    } catch (err) {
      setError((err as any).response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [noteId]);

  // Fetch list of notes
  const fetchNotes = useCallback(async (para?: object) => {
    setLoading(true);
    try {
      const response = await AxiosApi.get(`/notes`, {
        params: { ...memoizedParams, ...para },
      });
      setData(response.data);
    } catch (err) {
      setError((err as any).response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [memoizedParams]);

  // Auto-fetch notes when `folderId` changes
  // useEffect(() => {
  //   fetchNotes();
  // }, [fetchNotes]);
  return { data, loading, error, fetchData, fetchNotes, fetchSingleNote };
};

export default useFetchNotes;



//direction to use 
// fetchData(to pass folder,notes/recents) to get folderlist and recent list 
//fetchNotes({params}) to fetch notes list
//fetchSingleNote('noteId') to fetch info of a particular note