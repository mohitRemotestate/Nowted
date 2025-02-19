import { useState, useCallback } from "react";
import axios from "axios";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

const usePostRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const postData = useCallback(
    async (endpoint: string, body?: Record<string, any>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await AxiosApi.post(endpoint, body, {
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
        return response;
      } catch (err) {
        setError("Error while making a POST request");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []  
  );

  console.log(data)
  return { postData, loading, error, data };
};

export default usePostRequest;
