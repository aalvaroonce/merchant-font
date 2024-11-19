import { useState, useEffect } from "react";

const getUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    try {
        const parsedData = JSON.parse(userData) || {};
        return parsedData;
    } catch (error) {
        console.warn("Error al parsear los datos del localStorage:", error);
        return {};
    }
};

function FormularioWeb({ sendData, web }) {
    const user = getUserDataFromLocalStorage();

    const [data, setData] = useState(null);

    useEffect(() => {

        const getInitialData = () => {
            const existingReview = web.reviews.reviewTexts.find(
                review => review.userId === user._id
            );
            return existingReview
                ? { scoring: existingReview.scoring, reviewText: existingReview.reviewText }
                : { scoring: 0, reviewText: "" };
        };

        setData(getInitialData());
    }, [web, user._id]);

    const handleScoringChange = (newScoring) => {
        setData(prevData => ({ ...prevData, scoring: newScoring }));
    };

    const handleTextChange = (event) => {
        setData(prevData => ({ ...prevData, reviewText: event.target.value }));
    };

    const handleSubmit = () => {
        sendData(data);
    };

    if (!data) {
        return <div>Cargando...</div>;
    }

    return (
        
        <div className="formulario-container">
            <label>Puntuación:</label>
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={star}
                        className={`star ${star <= data.scoring ? 'filled' : ''}`}
                        onClick={() => handleScoringChange(star)}
                    >
                        ★
                    </span>
                ))}
            </div>

            <label>Reseña:</label>
            <input
                type="text"
                value={data.reviewText}
                onChange={handleTextChange}
                placeholder="Escribe tu reseña"
            />

            <button onClick={handleSubmit}>Enviar Reseña</button>
        </div>
    );
}

export default FormularioWeb;
