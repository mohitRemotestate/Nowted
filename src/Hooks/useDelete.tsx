import { useState, useCallback } from 'react';
import axios from 'axios';

const AxiosApi = axios.create({
  baseURL: 'https://nowted-server.remotestate.com',
});

const useDelete = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const deleteData = useCallback(
    async (endpoint: string, customHeaders?: Record<string, string>) => {
      setLoading(true);

      try {
        const response = await AxiosApi.delete(endpoint, {
          headers: {
            Accept: 'text/plain',
            ...customHeaders,
          },
        });
        setData(response.data); // Store response data
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, deleteData };
};

export default useDelete;
