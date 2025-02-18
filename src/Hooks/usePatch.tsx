import { useState, useCallback } from 'react';
import axios from 'axios';

const AxiosApi = axios.create({
  baseURL: 'https://nowted-server.remotestate.com',
});

const usePatch = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const patchData = useCallback(
    async (url: string, updateData: any, customHeaders?: Record<string, string>) => {
      setLoading(true);
      try {
        const response = await AxiosApi.patch(url, updateData, {
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            ...customHeaders,
          },
        });
        setData(response.data); 
      } catch (err) {
        setError('Error updating the note');
      } finally {
        setLoading(false);
      }
    },
    []);

  return { data, loading, error, patchData };
};

export default usePatch;
// 