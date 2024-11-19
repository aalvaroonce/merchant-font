import { useEffect, useState } from "react";
import WebReview from "./WebReview"

export default function WebDetails({ cif }) {
    const [web, setWeb] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const url = `http://localhost:3000/api/web/${cif}`;
                const response = await fetch(url);
                const data = await response.json();
                setWeb(data.data);
            } 
            catch(error) {
                console.error('Error fetching data:', error);
            }
        }

        if (cif) fetchData();
    }, [cif]);

    if (!web) {
        return <h2 className="no-web-message">Ninguna web seleccionada</h2>;
    } else {
        return (
            <div className="web-details">
                <h1 className="web-heading">{web.heading}</h1>
                <h3 className="web-city">{web.city}</h3>
                <h3 className="web-activity">{web.activity}</h3>
                <h3 className="web-summary">{web.summary}</h3>
                <div className="lista-container">
                    {web.textArray.map((text, index) => (
                        <div key={index} className="lista-item">
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
                {web.imageArray.map((imageUrl, index) => (
                    <img key={index} className="web-image" src={imageUrl} alt={`Imagen ${index + 1}`} />
                ))}
                <WebReview web={web}/>
            </div>
        );
    }
}
