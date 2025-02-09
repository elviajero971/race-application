import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../api/users_api';
import { createRace } from '../../api/races_api';

const RaceNew = () => {
    const navigate = useNavigate();
    const [raceStatus, setRaceStatus] = useState('pending');
    const [raceStartDate, setRaceStartDate] = useState('');
    const [raceTitle, setRaceTitle] = useState('');
    const [participants, setParticipants] = useState([
        { user_id: '', lane: '' },
        { user_id: '', lane: '' },
    ]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Load available users for the select list.
    useEffect(() => {
        fetchUsers()
            .then((data) => setUsers(data))
            .catch((err) => setError(err.message));
    }, []);

    const handleParticipantChange = (index, field, value) => {
        const newParticipants = [...participants];
        newParticipants[index][field] = value;
        setParticipants(newParticipants);
    };

    const addParticipantRow = () => {
        setParticipants([...participants, { user_id: '', lane: '' }]);
    };

    const removeParticipantRow = (index) => {
        const newParticipants = [...participants];
        newParticipants.splice(index, 1);
        setParticipants(newParticipants);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const raceData = {
            status: raceStatus,
            title: raceTitle,
            start_date: raceStartDate,
            race_participants_attributes: participants,
        };

        try {
            await createRace(raceData);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Create a New Race</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1" htmlFor="raceStartDate">
                        Race Date
                    </label>
                    <input
                        id="raceStartDate"
                        type="date"
                        value={raceStartDate}
                        onChange={(e) => setRaceStartDate(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1" htmlFor="raceTitle">
                        Race Title
                    </label>
                    <input
                        id="raceTitle"
                        type="text"
                        value={raceTitle}
                        onChange={(e) => setRaceTitle(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                {/* Race status is hidden (always pending) */}
                <input type="hidden" name="status" value="pending" />

                <div>
                    <h3 className="font-medium mb-2">Participants</h3>
                    {participants.map((participant, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-3 gap-4 items-center mb-2"
                        >
                            {/* User select */}
                            <div>
                                <label
                                    className="block text-sm font-medium"
                                    htmlFor={`participant-${index}-user`}
                                >
                                    User
                                </label>
                                <select
                                    id={`participant-${index}-user`}
                                    value={participant.user_id}
                                    onChange={(e) =>
                                        handleParticipantChange(index, 'user_id', e.target.value)
                                    }
                                    className="border rounded p-2 w-full"
                                    required
                                >
                                    <option value="">Select a user</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Lane input */}
                            <div>
                                <label
                                    className="block text-sm font-medium"
                                    htmlFor={`participant-${index}-lane`}
                                >
                                    Lane
                                </label>
                                <input
                                    id={`participant-${index}-lane`}
                                    type="number"
                                    value={participant.lane}
                                    onChange={(e) =>
                                        handleParticipantChange(index, 'lane', e.target.value)
                                    }
                                    className="border rounded p-2 w-full"
                                    required
                                    min="1"
                                />
                            </div>
                            {/* Remove button */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => removeParticipantRow(index)}
                                    className="text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addParticipantRow}
                        className="mt-2 text-blue-500 hover:underline"
                    >
                        Add Participant
                    </button>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Create Race
                </button>
            </form>
        </div>
    );
};

export default RaceNew;
