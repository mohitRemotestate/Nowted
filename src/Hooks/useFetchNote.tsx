
import axios from 'axios';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
});

function useFetchNote(){
    const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const { folderId, noteId } = useParams();

  const folderName = useMemo(() => {
    return folderId === "trash" || folderId === "favorite" || folderId === "archived"
      ? undefined
      : folderId;
  }, [folderId]);

  const memoizedParams = useMemo(() => ({
    folderId: folderName,
  }), [folderName]);

    const fetchNote = useCallback(async (para?: object)=>{
        setLoading(true);
        try{
            const response = await AxiosApi.get(`/notes`,{
                params: {...memoizedParams, ...para},
            })
            setData(response.data)
        } catch(err){
            setError(err)
        } finally{
            setLoading(false);
        }
    }, [memoizedParams])

    return{data, loading, error, fetchNote}

}
export default useFetchNote;