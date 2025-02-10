import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateRace } from '../../api/races_api';
import { useRaceEditData } from '../../hooks/useRaceEditData';
import { useUsers } from '../../hooks/useUsers';
import { useNotification } from "../../context/NotificationContext";

const RaceUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        race,
        status,
        setStatus,
        title,
        setTitle,
        startDate,
        setStartDate,
        participants,
        setParticipants,
        loading,
        error,
    } = useRaceEditData(id);

    const { users, loading: usersLoading, error: usersError } = useUsers();

    const [formError, setFormError] = useState('');

    const { showNotification } = useNotification();

    const handleParticipantChange = (index, field, value) => {
        const newParticipants = [...participants];
        if (field === 'remove') {
            newParticipants.splice(index, 1);
        } else {
            newParticipants[index][field] = value;
        }
        setParticipants(newParticipants);
    };

    const addParticipantRow = () => {
        setParticipants([...participants, { user_id: '', lane: '', position: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const raceData = {
            status,
            title,
            start_date: startDate,
            race_participants_attributes: participants.map((p) => ({
                id: p.id,
                user_id: p.user_id,
                lane: p.lane,
                position: p.position,
            })),
        };

        try {
            await updateRace(id, raceData);
            showNotification("Race updated successfully", "success");
            navigate(`/races/${id}`);
        } catch (err) {
            setFormError(err.message);
            showNotification("An error occurred, race couldn't be updated", 'error');
        }
    };

    if (loading || usersLoading) {
        return <div className="text-center mt-4">Loading race details for editing...</div>;
    }

    if (error || usersError) {
        return (
            <div className="text-center mt-4 text-red-500">
                Error: {error || usersError}
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Update Race</h2>
            {formError && <div className="text-red-500 mb-4">{formError}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="status" className="block font-medium mb-1">
                        Race Status:
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="title" className="block font-medium mb-1">
                        Race Title:
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="startDate" className="block font-medium mb-1">
                        Start Date:
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <h3 className="font-medium mb-2">Participants</h3>
                    <div className="space-y-4">
                        {participants.map((participant, index) => (
                            <div
                                key={participant.id || index}
                                className="grid grid-cols-3 gap-4 items-center border p-4 rounded shadow-sm bg-gray-50"
                            >
                                <div>
                                    <label
                                        htmlFor={`participant-${index}-user`}
                                        className="block text-sm font-medium"
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
                                <div>
                                    <label
                                        htmlFor={`participant-${index}-lane`}
                                        className="block text-sm font-medium"
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
                                <div>
                                    <label
                                        htmlFor={`participant-${index}-position`}
                                        className="block text-sm font-medium"
                                    >
                                        Position
                                    </label>
                                    <input
                                        id={`participant-${index}-position`}
                                        type="number"
                                        value={participant.position}
                                        onChange={(e) =>
                                            handleParticipantChange(index, 'position', e.target.value)
                                        }
                                        className="border rounded p-2 w-full"
                                        required
                                        min="1"
                                    />
                                </div>
                                <div className="col-span-3 text-right">
                                    <button
                                        type="button"
                                        onClick={() => handleParticipantChange(index, 'remove')}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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
                    Update race
                </button>
            </form>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => navigate(`/races/${id}`)}
            >
                Cancel
            </button>
        </div>
    );
};

export default RaceUpdate;
