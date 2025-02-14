import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AxiosApi = axios.create({
    baseURL:'https://nowted-server.remotestate.com'
})
const useFetchNotes = (endpoint: string, params?: object) => {

    const {folderId} = useParams()

    const defparams ={ 
        }

    const mergedParams = {...defparams,...params}

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await AxiosApi.get(`/${endpoint}`, {
                    params: mergedParams
                });
                setData(response.data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);  // Re-run the effect if either endpoint or params change

    return { data, loading, error };
};

export default useFetchNotes;