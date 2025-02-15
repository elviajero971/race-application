import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateRace } from '../../api/races_api';
import { useRaceEditData } from '../../hooks/useRaceEditData';
import { useUsers } from '../../hooks/useUsers';
import { useNotification } from '../../context/NotificationContext';
import RaceForm from '../../components/RaceForm';

const RaceUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const {
        race,
        status,
        title,
        startDate,
        participants,
        loading,
        error,
    } = useRaceEditData(id);

    const { users, loading: usersLoading, error: usersError } = useUsers();

    const [raceUpdateError, setRaceUpdateError] = useState(null);

    const onSubmit = async (data) => {
        const raceData = {
            status: data.status,
            title: data.title,
            start_date: data.start_date,
            race_participants_attributes: data.race_participants_attributes.map((p) => ({
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
            setRaceUpdateError(err.message);
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

    const initialValues = {
        status: status || 'pending',
        title: title || '',
        start_date: startDate || '',
        race_participants_attributes: participants.map((p) => ({
            id: p.id,
            user_id: p.user_id || '',
            lane: p.lane || '',
            position: p.position || '',
        })),
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Update Race</h2>
            <RaceForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                users={users}
                showStatus={true}
                showParticipantPosition={true}
                formError={raceUpdateError}
            />
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
