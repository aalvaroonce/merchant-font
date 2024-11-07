import axios from 'axios';
import { useEffect, useState } from 'react';
import WebDetails from './WebDetails';
import Filter from './Filter';

const WebList = () => {
    const [webs, setWebs] = useState([]);
    const [cifSelected, setCifSelected] = useState("");
    const [filters, setFilters] = useState({ city: "", activity: "", sortByScoring: false, upwards: "true" });

    useEffect(() => {
        fetchWebs(filters);
    }, [filters]);

    async function fetchWebs(filters) {
        try {
            let url = `http://localhost:3000/api/web`;
            if (filters.city || filters.activity || filters.sortByScoring) {
                url += `/search/${filters.city || "empty"}/${filters.activity || "empty"}`;
                if (filters.sortByScoring) {
                    url += `?sortByScoring=true&upwards=${filters.upwards}`;
                }
            }
            const response = await axios.get(url);
            setWebs(response.data.webs);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };
    

    return (
        <div className="web-list">
            <h2 className="web-list-title">Lista de Webs</h2>
            <Filter onFilterChange={handleFilterChange} />
            <div className="webs-container">
                {webs.map((web) => (
                    <div key={web.businessCIF} className="web-card">
                        <h3 className="web-heading" onClick={() => setCifSelected(web.businessCIF)}>{web.heading}</h3>
                        <p className="web-city">Ciudad: {web.city}</p>
                        <p className="web-activity">Actividad: {web.activity}</p>
                    </div>
                ))}
            </div>
            {cifSelected && <WebDetails cif={cifSelected} />}
        </div>
    );
};

export default WebList;
