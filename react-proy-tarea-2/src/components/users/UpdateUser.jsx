import FormularioPut from '../formularios/FormularioPut.jsx'
import { useState, useEffect } from 'react'
import Mensaje from '../Mensaje.jsx';

export default function UpdateUser() {
    const [body, setBody] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendData = (data) => {
        setBody(data);
        setMensaje(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const id= user._id

        if (body) {

            fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    setMensaje({ text: data.message, type: "exito" });
                })
                .catch(error => {
                    setLoading(false);
                    setMensaje({ text: "Error en la conexión", type: "error" });
                })
        }
    }, [body])

    return (
        <>
            <FormularioPut sendData={handleSendData} />
            {loading ? <p>Cargando...</p> : <Mensaje mensaje={mensaje} />}
        </>
    )
}


