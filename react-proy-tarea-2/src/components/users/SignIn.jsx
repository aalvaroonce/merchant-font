import { useState, useEffect } from 'react';
import FormularioSignIn from '../formularios/FormularioSignIn';
import Mensaje from '../Mensaje';

function SignIn() {
    const [body, setBody] = useState(null);
    const [mensaje, setMensaje] = useState("");

    const handleSendData = (data) => {
        setBody(data);  
        setMensaje(null); 
    };

    useEffect(() => {
        if (body) {

            fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  
                },
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);

                    if (data.data.token && data.data.user._id) {
                        localStorage.setItem('token', data.data.token);
                        localStorage.setItem('token', data.data.user._id);
                        setMensaje({ text: data.message, type: "exito" });
                    } else if (data.errors && Array.isArray(data.errors)) {
                        const errorMessages = data.errors.map(error => error.msg).join(", ");
                        setMensaje({ text: errorMessages, type: "error" });
                    } else {
                        setMensaje({ text: "Ocurrió un error desconocido", type: "error" });
                    }
                })
                .catch(error => {
                    setMensaje({ text: "Error en la conexión", type: "error" });
                });
        }
    }, [body]);

    return (
        <>
            <FormularioSignIn sendData={handleSendData} />
            <Mensaje mensaje={mensaje} />
        </>
    );
}

export default SignIn;
