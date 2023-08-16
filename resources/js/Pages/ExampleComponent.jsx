import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExampleComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/get-data')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h2>Przykładowe dane:</h2>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ExampleComponent;
