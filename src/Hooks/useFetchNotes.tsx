
import { useState, useCallback, useMemo } from "react";
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

  
  return { data, loading, error, fetchData, fetchNotes, fetchSingleNote };
};

export default useFetchNotes;



//direction to use 
// fetchData(to pass folder,notes/recents) to get folderlist and recent list 
//fetchNotes({params}) to fetch notes list
//fetchSingleNote('noteId') to fetch info of a particular note