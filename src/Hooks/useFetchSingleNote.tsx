
import { useState } from 'react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
})

interface Folder{
    createdAt:string,
    deletedAt: string| null,
    id: string,
    name: string,
    updatedAt:string|null
  }
  
  interface Note{
    note: {
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
  }}


function useFetchSingleNote(){

    const [data, setData] = useState<Note | null>(null)
    const [loading, setLoading]= useState(false)
    const [error,setError] = useState<any>(null);
    const {noteId} = useParams();
    
    const fetchSingleNote = useCallback(async()=>{
        if(!noteId) return;
        setLoading(true);
        try{
            const response = await AxiosApi.get(`/notes/${noteId}`);
            setData(response.data);
        } catch(err){
            setError(err)
        } finally{
            setLoading(false);
        }
    },[noteId]);

    return {data, loading, error, fetchSingleNote}

}

export default useFetchSingleNote;