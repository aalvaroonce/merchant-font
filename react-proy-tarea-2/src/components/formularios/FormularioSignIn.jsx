import { useState } from "react";

function FormularioSignIn({ sendData }) {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: 0,
        city: '',
        hobbies: [],
        openToOffers: false,
    });

    const [error, setError] = useState("");
    const [newHobby, setNewHobby] = useState(""); 


    const handleChange = (event, field) => {
        const value = field === 'openToOffers' ? event.target.checked : event.target.value;
        setData({
            ...data,
            [field]: value
        });
    };

    const handleClick = () => {
        if (data.password !== data.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setError("");
        sendData(data);
    };

    const handleAddHobby = () => {
        if (newHobby.trim()) {
            setData({
                ...data,
                hobbies: [...data.hobbies, newHobby.trim()]
            });
            setNewHobby(""); 
        }
    };

    return (
        <div className="formulario-container">
            <label>Nombre</label>
            <input type="text" onChange={(event) => handleChange(event, 'name')} />

            <label>Email</label>
            <input type="text" onChange={(event) => handleChange(event, 'email')} />

            <label>Contraseña</label>
            <input type="password" onChange={(event) => handleChange(event, 'password')} />

            <label>Confirmar contraseña</label>
            <input type="password" onChange={(event) => handleChange(event, 'confirmPassword')} />

            <label>Edad</label>
            <input type="number" onChange={(event) => handleChange(event, 'age')} />

            <label>Ciudad</label>
            <input type="text" onChange={(event) => handleChange(event, 'city')} />

            <label>Hobbies</label>
            <div className="hobby-input">
                <input 
                    type="text" 
                    value={newHobby} 
                    onChange={(event) => setNewHobby(event.target.value)} 
                />
                <button type="button" onClick={handleAddHobby}>Añadir hobby</button>
            </div>
            <div>
                <label>¿Desea recibir notificaciones de posibles comercios?</label>
                <input
                    type="checkbox"
                    checked={data.openToOffers}
                    onChange={(event) => handleChange(event, 'openToOffers')}
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button onClick={handleClick}>Enviar</button>
        </div>
    );
}

export default FormularioSignIn;
