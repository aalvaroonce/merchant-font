import FormularioWeb from '../formularios/FormularioWeb.jsx'
import { useState, useEffect } from 'react'
import Mensaje from '../Mensaje.jsx';

function WebReview({ web }) {
    const [body, setBody] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const token = localStorage.getItem('token');

    const handleSendData = (data) => {
        setBody(data);  
        setMensaje(null); 
    };

    useEffect(() => {
        if (body) {
            fetch(`http://localhost:3000/api/web/addreview/${web.businessCIF}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setMensaje({ text: "Reseña enviada con éxito", type: "exito" });
                })
                .catch(error => {
                    console.error(error);
                    setMensaje({ text: "Error al enviar la reseña", type: "error" });
                });
        }
    }, [body, token, web.businessCIF]); 

    return (
        <>
            <FormularioWeb sendData={handleSendData} web={web} />
            {mensaje && <Mensaje mensaje={mensaje} />}
        </>
    );
}

export default WebReview