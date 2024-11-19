import { useState, useEffect } from 'react';
import FormularioLogIn from '../formularios/FormularioLogIn';
import Mensaje from '../Mensaje';

function LogIn() {
    const [body, setBody] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendData = (data) => {
        setBody(data);
        setMensaje(null);
    };

    useEffect(() => {
        if (body) {
            setLoading(true);  

            fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setLoading(false);

                    if (data.data.token) {
                        localStorage.setItem('token', data.data.token);
                        localStorage.setItem('user', JSON.stringify(data.data.user));
                        setMensaje({ text: data.message, type: "exito" });
                    } else if (data.errors && Array.isArray(data.errors)) {
                        const errorMessages = data.errors.map(error => error.msg).join(", ");
                        setMensaje({ text: errorMessages, type: "error" });
                    } else {
                        setMensaje({ text: "Ocurrió un error desconocido", type: "error" });
                    }
                })
                .catch(error => {
                    setLoading(false);
                    setMensaje({ text: "Error en la conexión", type: "error" });
                });
        }
    }, [body]);

    return (
        <div className="app-container">
            <FormularioLogIn sendData={handleSendData} />
            {loading ? <p>Cargando...</p> : <Mensaje mensaje={mensaje} />}
        </div>
    );
}

export default LogIn;
