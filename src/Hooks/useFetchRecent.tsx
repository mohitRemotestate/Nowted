
import { useState, useCallback } from "react";
import axios from "axios";

interface Folder{
    createdAt:string,
    deletedAt: string| null,
    id: string,
    name: string,
    updatedAt:string|null
  }
  
  interface Note{
        id: string,
        folderId: string,
        title: string,
        content: string,
        isFavorite: boolean,
        isArchived: boolean,
        createdAt: string,
        updatedAt: string,
        deletedAt: null|string,
        folder: Folder
  }

  interface Recent{
      recentNotes: Array<Note>
  }

  const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
  });

//folder done
const useFetchRecent = () => {
    const [data, setData] = useState<Recent|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    const fetchRecent =useCallback(async()=>{
        setLoading(true);
        try{
            const response = await AxiosApi.get("/notes/recent");
            setData(response.data);
        }catch(err){
            setError(err as Error);
        }finally{
            setLoading(false);
        }

    },[]);

return{data,loading,error,fetchRecent}

  }

  export default useFetchRecent;