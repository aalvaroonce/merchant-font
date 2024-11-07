import { useState } from "react";

const Filter = ({ onFilterChange }) => {
    const [activity, setActivity] = useState("");
    const [city, setCity] = useState("");
    const [sortByScoring, setSortByScoring] = useState(false);
    const [upwards, setUpwards] = useState("true");

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    function handleActivityChange(event) {
        setActivity(event.target.value);
    }

    function toggleSortByScoring() {
        setSortByScoring(!sortByScoring);
    }

    function handleOrderChange(event) {
        setUpwards(event.target.value);
    }

    const handleClick = () => {
        const filterData = {
            city,
            activity,
            sortByScoring,
            upwards
        };
        onFilterChange(filterData);
    };

    return (
        <div className="filter-container">
            <label className="filter-label">Ciudad</label>
            <input
                className="filter-input"
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Ingrese la ciudad"
            />

            <label className="filter-label">Actividad</label>
            <input
                className="filter-input"
                type="text"
                value={activity}
                onChange={handleActivityChange}
                placeholder="Ingrese la actividad"
            />

            <label className="filter-label">Ordenar por Scoring</label>
            <button className="filter-button" onClick={toggleSortByScoring}>
                {sortByScoring ? "Desactivar" : "Activar"} Ordenación
            </button>

            {sortByScoring && (
                <>
                    <label className="filter-label">Dirección</label>
                    <div className="direction-options">
                        <label className="direction-option">
                            <input
                                type="checkbox"
                                value="true"
                                checked={upwards === "true"}
                                onChange={handleOrderChange}
                            />
                            Ascendente
                        </label>
                        <label className="direction-option">
                            <input
                                type="checkbox"
                                value="false"
                                checked={upwards === "false"}
                                onChange={handleOrderChange}
                            />
                            Descendente
                        </label>
                    </div>
                </>
            )}

            <button className="filter-button" onClick={handleClick}>Aplicar Filtros</button>
        </div>
    );
};

export default Filter;
