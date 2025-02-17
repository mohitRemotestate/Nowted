	

// Respond a list of recently updated or created notes

// Media type

// application/json
// Controls Accept header.
// Example Value
// Schema
// {
//   "recentNotes": [
//     {
//       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "folderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "title": "string",
//       "isFavorite": true,
//       "isArchived": true,
//       "createdAt": "string",
//       "updatedAt": "string",
//       "deletedAt": "string",
//       "preview": "string",
//       "folder": {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "name": "string",
//         "createdAt": "string",
//         "updatedAt": "string",
//         "deletedAt": "string"
//       }
//     }
//   ]
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchNotes() {
    // State to store the fetched notes data
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                
                const response = await axios.get('https://nowted-server.remotestate.com/notes/recent');
                
                
                setNotes(response.data);
                setLoading(false);
            } catch (err) {
                // Handle errors if the request fails
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData(); // Call the function to fetch data
    }, []); // Empty dependency array means this effect runs only once (on mount)

    // Conditional rendering for loading, error, or displaying notes
    if (loading) return <div className='text-white'>Loading...</div>;
    if (error) return <div className='text-white'>{error}</div>;

    return (
        <div className='text-white'>
            <h1>Recent Notes</h1>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>{note.title}</li> // Replace 'id' and 'title' with your actual data fields
                ))}
            </ul>
        </div>
    );
}



const data ={
  "recentNotes": [
    {
      "id": "2919caa3-cd04-4017-a1e2-598c18dafff3",
      "folderId": "91803881-6292-4009-a3ab-6989d4ca0beb",
      "title": "Shagun's First Note",
      "isFavorite": false,
      "isArchived": false,
      "createdAt": "2025-02-13 07:18:49.980854+00",
      "updatedAt": "2025-02-13 07:18:49.980854+00",
      "deletedAt": null,
      "preview": "This is my small Content",
      "folder": {
        "id": "91803881-6292-4009-a3ab-6989d4ca0beb",
        "name": "Shagun Raj",
        "createdAt": "2025-02-12T13:04:44.087808+00:00",
        "updatedAt": "2025-02-12T13:04:44.087808+00:00",
        "deletedAt": null
      }
    },
    {
      "id": "4b3b5782-5721-4ca7-aed1-a6ef8242fb7f",
      "folderId": "91803881-6292-4009-a3ab-6989d4ca0beb",
      "title": "Shagun's First Note",
      "isFavorite": false,
      "isArchived": false,
      "createdAt": "2025-02-13 07:18:48.474415+00",
      "updatedAt": "2025-02-13 07:18:48.474415+00",
      "deletedAt": null,
      "preview": "This is my small Content",
      "folder": {
        "id": "91803881-6292-4009-a3ab-6989d4ca0beb",
        "name": "Shagun Raj",
        "createdAt": "2025-02-12T13:04:44.087808+00:00",
        "updatedAt": "2025-02-12T13:04:44.087808+00:00",
        "deletedAt": null
      }
    },
    {
      "id": "95514c63-1a83-4a47-be06-77a69fe95709",
      "folderId": "91803881-6292-4009-a3ab-6989d4ca0beb",
      "title": "Personal Data",
      "isFavorite": false,
      "isArchived": false,
      "createdAt": "2025-02-12 19:32:37.610897+00",
      "updatedAt": "2025-02-12 19:32:37.610897+00",
      "deletedAt": null,
      "preview": "Hello Everyone\n\nThis is the super secret data of R",
      "folder": {
        "id": "91803881-6292-4009-a3ab-6989d4ca0beb",
        "name": "Shagun Raj",
        "createdAt": "2025-02-12T13:04:44.087808+00:00",
        "updatedAt": "2025-02-12T13:04:44.087808+00:00",
        "deletedAt": null
      }
    }
  ]
}


export const Test = ()=>data
