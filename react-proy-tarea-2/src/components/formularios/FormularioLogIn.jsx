import { useState } from "react";

function FormularioLogIn ({ sendData }) {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event, field) => {
        setData({
            ...data,
            [field]: event.target.value
        });
    };

    const handleClick = () => {
        sendData(data);
    };

    return (
        <div className="formulario-container">
            <label>Email</label>
            <input type="text" onChange={(event) => handleChange(event, 'email')} />

            <label>Contraseña</label>
            <input type="password" onChange={(event) => handleChange(event, 'password')} />

            <button onClick={handleClick}>Enviar</button>
        </div>
    );
};

export default FormularioLogIn;
