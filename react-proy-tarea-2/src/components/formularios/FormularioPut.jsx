import { useState } from "react";

const getUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    try {
        const parsedData = JSON.parse(userData) || {};
        const { role, ...filteredData } = parsedData;
        return filteredData;

    } catch (error) {
        console.warn("Error al parsear los datos del localStorage:", error);
        return {};
    }
};

function FormularioPut({ sendData }) {
    const [data, setData] = useState(getUserDataFromLocalStorage()); 
    const [error, setError] = useState("");
    const [newHobby, setNewHobby] = useState(""); 
    const [editIndex, setEditIndex] = useState(null); 

    const handleChange = (event, field) => {
        const value = field === 'openToOffers' ? event.target.checked : event.target.value;
        setData({
            ...data,
            [field]: value
        });
    };

    const handleClick = () => {
        setError("");
        sendData(data);
    };

    const handleAddHobby = () => {
        if (newHobby.trim()) {
            const hobbyAlreadyExists = data.hobbies.includes(newHobby.trim());
            if (!hobbyAlreadyExists || editIndex !== null) {
                const updatedHobbies = editIndex !== null
                    ? data.hobbies.map((hobby, index) => index === editIndex ? newHobby.trim() : hobby)
                    : [...(data.hobbies || []), newHobby.trim()]; 

                setData({
                    ...data,
                    hobbies: updatedHobbies
                });
                setNewHobby("");
                setEditIndex(null);
            } else {
                setError("El hobby ya existe en la lista.");
            }
        }
    };

    const handleEditHobby = (index) => {
        setNewHobby(data.hobbies[index]);
        setEditIndex(index);
    };

    const handleDeleteHobby = (index) => {
        const updatedHobbies = data.hobbies.filter((_, i) => i !== index);
        setData({
            ...data,
            hobbies: updatedHobbies
        });
    };

    return (
        <div className="formulario-container">
            <label>Nombre</label>
            <input 
                type="text" 
                placeholder={data?.name || ''} 
                onChange={(event) => handleChange(event, 'name')} 
            />

            <label>Email</label>
            <input 
                type="text" 
                placeholder={data?.email || ''} 
                onChange={(event) => handleChange(event, 'email')} 
            />

            <label>Edad</label>
            <input 
                type="number" 
                placeholder={data?.age || ''} 
                onChange={(event) => handleChange(event, 'age')} 
            />

            <label>Ciudad</label>
            <input 
                type="text" 
                placeholder={data?.city || ''} 
                onChange={(event) => handleChange(event, 'city')} 
            />

            <label>Hobbies</label>
            <div className="hobby-input">
                <input 
                    type="text" 
                    value={newHobby} 
                    onChange={(event) => setNewHobby(event.target.value)} 
                />
                <button type="button" onClick={handleAddHobby}>
                    {editIndex !== null ? "Modificar hobby" : "Añadir hobby"}
                </button>
            </div>

            <ul className="hobby-list">
                {data?.hobbies && data.hobbies.map((hobby, index) => (
                    <li key={index}>
                        {hobby}
                        <button onClick={() => handleEditHobby(index)}>Editar</button>
                        <button onClick={() => handleDeleteHobby(index)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <div>
                <label>¿Desea recibir notificaciones de posibles comercios?</label>
                <input
                    type="checkbox"
                    checked={data?.openToOffers || false}
                    onChange={(event) => handleChange(event, 'openToOffers')}
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button onClick={handleClick}>Enviar</button>
        </div>
    );
}

export default FormularioPut;
