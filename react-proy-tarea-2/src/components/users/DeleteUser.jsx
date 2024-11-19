import { useState } from 'react'
import Mensaje from '../Mensaje';

export default function DeleteUser(){

    const [mensaje, setMensaje] = useState(null);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const id= user._id
    
    const handleClick= async () => {

        fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMensaje({ text: data.message, type: "exito" });
            })
            .catch(error => {
                setMensaje({ text: "Error en la conexión", type: "error" });
            })
        
    }
    return(
        <>
            <button onClick={handleClick}>Pulsa para borrar</button>
            <Mensaje mensaje={mensaje}/>
        </>
    )
}