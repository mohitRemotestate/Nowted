
import { useState, useCallback } from "react";
import axios from "axios";



 export interface Folder {
   createdAt: string;
   deletedAt: string | null;
   id: string;
   name: string;
   updatedAt: string | null;
 }

 export interface FolderList {
   folders: Array<Folder | null>;
 }
//   interface ErrorType {
//     error: string;
//     message: string;
//   }

  const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
  });

  //folder done
  const useFetchFolder = () => {
    const [data, setData] = useState<FolderList | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    const fetchFolder = useCallback(async () => {
      setLoading(true);
      try {
        const response = await AxiosApi.get("/folders");
        setData(response.data);
      } catch (err) {
        setError(err as Error);
        // if (err instanceof Error) {
        //   setError(err); // Now TypeScript knows it's an Error type
        // } else {
        //   setError(new Error("An unknown error occurred")); // Handle unexpected cases
        // }
      } finally {
        setLoading(false);
      }
    }, []);

    return { data, loading, error, fetchFolder };
  };

  export default useFetchFolder;