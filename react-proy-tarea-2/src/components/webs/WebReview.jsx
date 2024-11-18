import FormularioWeb from '../formularios/FormularioWeb.jsx'
import {useState} from 'react'
import Mensaje from '../Mensaje.jsx';

export default function DataPost(){
    const [body, setBody] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const token = localStorage.getItem('token');
    const id= localStorage.getItem('id')

    const handleSendData = (data) => {
        setBody(data);  
        setMensaje(null); 
    };

    const handleClick= () =>{


        fetch(`http://localhost:3000/api/users/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        }
    return(
        <>
            <FormularioWeb sendData={handleSendData}/>
            <button onClick={handleClick}>Pulsa para el Put</button>
            <Mensaje mensaje= {mensaje}/>
        </>
    )
}


