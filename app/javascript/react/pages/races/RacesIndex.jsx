import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRaces, deleteRace } from '../../api/races_api';
import { UserIcon, ViewDetailsIcon, DeleteIcon, SpinnerIcon } from "../../components/Icons";
import { dateFormating } from "../../utils/dataFormating";
import { useNotification } from "../../context/NotificationContext";

const RacesIndex = () => {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { showNotification } = useNotification();

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

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this race?")) {
            try {
                const result = await deleteRace(id);
                if (result && result.message) {
                    showNotification(result.message, 'success');
                } else {
                    showNotification('An error occurred', 'error');
                }
                setRaces(races.filter(race => race.id !== id));
            } catch (err) {
                showNotification(err.message, 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <SpinnerIcon />
            </div>);
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className='relative w-full max-w-3xl mx-auto'>
            <div className="mt-8">
                <div className='flex justify-around items-center'>
                    <h2 className="text-2xl font-bold mb-4">List of races</h2>
                    <Link to="/races/new" className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        Create a new race
                    </Link>
                </div>
                {races.length === 0 ? (
                    <div className="text-center text-gray-600">No races yet. Create the first one.</div>
                ) : (
                    <ul className="space-y-4">
                        {races.map((race) => (
                            <li
                                key={race.id}
                                className="flex items-center justify-between border rounded p-4 shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center space-x-6">
                                    <div>
                                        <p className="text-lg font-semibold">{race.title}</p>
                                        <p className="text-xs sm:text-sm md:text-base text-gray-600 truncate">
                                            Date: {dateFormating(race.start_date)}
                                        </p>
                                    </div>
                                    <span className="flex text-blue-500 px-3 py-1">
      {race.race_participants ? race.race_participants.length : 0}
                                        <UserIcon />
    </span>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <Link
                                        to={`/races/${race.id}`}
                                        className="px-3 py-1"
                                        aria-label="View details"
                                    >
                                        <ViewDetailsIcon />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(race.id)}
                                        className="px-3 py-1"
                                        aria-label="Delete race"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </li>

                        ))}
                    </ul>
                )}
            </div>
        </div>

    );
};

export default RacesIndex;
