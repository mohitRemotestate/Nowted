
import axios from 'axios';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';


interface Folder{
    createdAt:string,
    deletedAt: string| null,
    id: string,
    name: string,
    updatedAt:string|null
}

export interface Note {
  id: string;
  folderId: string;
  title: string;
  preview: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  folder: Folder;
}

interface NoteList {
  notes: Array<Note>;
  total: number;
}

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function useFetchNote() {
  const [data, setData] = useState<NoteList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { folderId } = useParams();

  const folderName = useMemo(() => {
    return folderId === "trash" ||
      folderId === "favorite" ||
      folderId === "archived"
      ? undefined
      : folderId;
  }, [folderId]);

  const memoizedParams = useMemo(
    () => ({
      folderId: folderName,
    }),
    [folderName]
  );

  const fetchNote = useCallback(
    async (para?: object) => {
      setLoading(true);
      try {
        const response = await AxiosApi.get(`/notes`, {
          params: { ...memoizedParams, ...para },
        });
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [memoizedParams]
  );

  return { data, loading, error, fetchNote };
}
export default useFetchNote;