import React from 'react';
import { useParams } from 'react-router-dom';


function EditPost() {
    const { id } = useParams();

    return (<>
        <p className='bg-red-500'>{id}</p>
    </>);
}

export default EditPost;