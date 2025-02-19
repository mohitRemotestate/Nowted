// import React from 'react';
import { useParams } from 'react-router-dom';

function FileDetail() {
    const { id } = useParams(); // Get the 'id' from the route parameter

    // Fetch the file details based on 'id' (you can use the id to get data from your API or use static data)
    const file = { id, title: `File ${id}`, content: `This is the detailed content for file ${id}` };

    return (
        <div className="file-detail-container">
            <h1>{file.title}</h1>
            <p>{file.content}</p>
        </div>
    );
}

export default FileDetail;
