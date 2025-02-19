
import { useState, useCallback, useMemo } from "react";
import axios from "axios";



  interface Folder{
    createdAt:string,
    deletedAt: string| null,
    id: string,
    name: string,
    updatedAt:string|null
  }

  interface FolderList{
    folders: Array<Folder | null>,
  }
  interface Error{
      error: string,
      message: string
  }

  const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
  });

//folder done
const useFetchFolder = () => {
    const [data, setData] = useState<FolderList|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetchFolder =useCallback(async()=>{
        setLoading(true);
        try{
            const response = await AxiosApi.get("/folders");
            setData(response.data);
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }

    },[]);

return{data,loading,error,fetchFolder}

  }

  export default useFetchFolder;