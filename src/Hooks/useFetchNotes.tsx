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
import axios from 'axios';
import { useParams } from "react-router-dom";


const AxiosApi = axios.create({
  baseURL: 'https://nowted-server.remotestate.com',
});



const useFetchNotes = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string |null>(null);
  const {folderId , noteId} = useParams();
  const folderName = ()=>{
    if(folderId == "trash" || folderId == "favorite" || folderId == "archived") return undefined;
    else return folderId;
  }
  const mergedParams = {folderId: folderName()};

 
  //for notes/recent and folder only
  const fetchData = useCallback(async (endpoint:string)=>{
      setLoading(true);
      try{
        const response = await AxiosApi.get(`/${endpoint}`);
        setData(response.data);
      }catch(err){
        setError(err as any);
      }finally{
        setLoading(false);
      }

    // },[endpoint]
  },[]);

  //for detail of single note
  const fetchSingleNote = useCallback(async(id)=>{
    setLoading(true);
    try{
      const response = await AxiosApi.get(`/notes/${id}`);
      setData(response.data)
    }catch(err){
      setError(err as any);
    }finally{
      setLoading(false);
    }
  },[noteId])

  //for list of notes
  const fetchNotes = useCallback(async (params?: object)=>{
    const memoizedParams = useMemo(() => ({
      ...params, folderId: folderName(),
    }), [params, folderId]);

    setLoading(true);
    try{
      const response = await AxiosApi.get(`/notes`,{
        params: {...memoizedParams},
      });
      setData(response.data);
    }catch(err){
      setError(err);
    }finally{
      setLoading(false);
    }
  },[mergedParams, folderId]);

  return {data, loading, error, fetchData, fetchNotes, fetchSingleNote}
}

export default useFetchNotes;


//direction to use 
// fetchData(to pass folder,notes/recents) to get folderlist and recent list 
//fetchNotes({params}) to fetch notes list
//fetchSingleNote('noteId') to fetch info of a particular note