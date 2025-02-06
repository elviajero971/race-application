// src/components/RacesIndex.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRaces } from '../api/races_api';
import { FaUser } from 'react-icons/fa';
import { dateFormating } from "../utils/dataFormating";

const RacesIndex = () => {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRaces()
            .then((data) => {
                setRaces(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-4">Loading races...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Races</h2>
            <ul className="space-y-4">
                {races.map((race) => (
                    <li
                        key={race.id}
                        className="border rounded p-4 shadow hover:shadow-lg transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold">{race.title}</p>
                                <p className="text-xs sm:text-sm md:text-base text-gray-600 whitespace-nowrap overflow-hidden truncate">
                                    Date: {dateFormating(race.start_date)}
                                </p>
                            </div>
                            <div>
                                <span className="flex text-blue-500 px-3 py-1">
                                    {race.race_participants ? race.race_participants.length : 0}
                                    <FaUser className="text-blue-500 mx-0.5" size={20} />
                                </span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <Link
                                to={`/races/${race.id}`}
                                className="inline-block px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            >
                                View Details
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RacesIndex;
