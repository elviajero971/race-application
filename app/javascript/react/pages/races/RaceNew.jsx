import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRace } from '../../api/races_api';
import { fetchUsers } from '../../api/users_api';
import { useNotification } from '../../context/NotificationContext';
import RaceForm from '../../components/RaceForm';

const RaceNew = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [users, setUsers] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [raceNewError, setRaceNewError] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then(data => setUsers(data))
            .catch(err => setFetchError(err.message));
    }, []);

    const onSubmit = async (data) => {
        try {
            await createRace(data);
            showNotification("Race created successfully", "success");
            navigate('/');
        } catch (err) {
            setRaceNewError(err.message);
        }
    };

    if (fetchError) {
        return <div className="text-center mt-4 text-red-500">Fetch Error: {fetchError}</div>;
    }

    const initialValues = {
        status: 'pending',
        title: '',
        start_date: '',
        race_participants_attributes: [
            { user_id: '', lane: '', position: '' },
            { user_id: '', lane: '', position: '' },
        ],
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Create a New Race</h2>
            <RaceForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                users={users}
                showStatus={false}
                showParticipantPosition={false}
                formError={raceNewError}
            />
        </div>
    );
};

export default RaceNew;
