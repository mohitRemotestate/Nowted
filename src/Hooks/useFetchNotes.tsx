import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Folders from '../Components/Left/Folder';

const AxiosApi = axios.create({
  baseURL: 'https://nowted-server.remotestate.com',
});

const useFetchNotes = (endpoint: string, params?: object) => {
  const { folderId, noteId } = useParams();
  const foldername = ()=>{
    if(folderId == "trash" || folderId == "favourite" || folderId == "archived") return null;
    else return folderId;
  }

  const mergedParams = { ...params, folderId : foldername() };

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AxiosApi.get(`/${endpoint}`, {
        params: mergedParams,
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, folderId]);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    console.log(mergedParams);
    try {
      const response = await AxiosApi.get('/notes', {
        params: {...mergedParams },
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  const fetchSingleNote = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AxiosApi.get(`/notes/${noteId}`, {
        params: mergedParams
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [noteId, params]);

  // Trigger fetchData or fetchNotes based on the endpoint
  useEffect(() => {
    if (endpoint == 'notes/recent') fetchData();
    if (endpoint == 'folders') fetchData();
  }, [endpoint]);

  useEffect(() => {
    if (endpoint == 'notes') fetchNotes();
  }, [folderId]);

  useEffect(() => {
    console.log("to print in fetch notes  ")
    if (endpoint == `notes/${noteId}`) fetchSingleNote();
  }, [noteId]);

  // refetch function to manually trigger the fetch
  const refetch = useCallback(() => {
    if (endpoint == 'notes/recent') fetchData();
    if (endpoint == 'folders') fetchData();
    if (endpoint == 'notes') fetchNotes();
    if (endpoint == `notes/${noteId}`) fetchSingleNote();
  }, []);

  return { data, loading, error, refetch };
};

export default useFetchNotes;
