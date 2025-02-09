import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRaces, deleteRace } from '../../api/races_api';
import { FaUser } from 'react-icons/fa';
import { dateFormating } from "../../utils/dataFormating";
import Message from '../../components/Message';

const RacesIndex = () => {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);

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
                // If deleteRace returns a JSON message, set the notification.
                if (result && result.message) {
                    setNotification(result.message);
                } else {
                    setNotification("Race deleted successfully");
                }
                // Update the state by removing the deleted race.
                setRaces(races.filter(race => race.id !== id));
            } catch (err) {
                setNotification(err.message);
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-4">Loading races...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className='relative w-full max-w-3xl mx-auto'>
            {notification && (
                <Message
                    message={notification}
                    type="success"
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="mt-8">
                <div className='flex justify-around items-center'>
                    <h2 className="text-2xl font-bold mb-4">Races</h2>
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
                                {/* Left section: Race details and participant count */}
                                <div className="flex items-center space-x-6">
                                    <div>
                                        <p className="text-lg font-semibold">{race.title}</p>
                                        <p className="text-xs sm:text-sm md:text-base text-gray-600 truncate">
                                            Date: {dateFormating(race.start_date)}
                                        </p>
                                    </div>
                                    <span className="flex text-blue-500 px-3 py-1">
      {race.race_participants ? race.race_participants.length : 0}
                                        <FaUser className="text-blue-500 mx-0.5" size={20} />
    </span>
                                </div>

                                {/* Right section: Buttons */}
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to={`/races/${race.id}`}
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(race.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                    >
                                        Delete Race
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
