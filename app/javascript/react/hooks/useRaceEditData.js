import { useState, useEffect } from 'react';
import { fetchRace } from '../api/races_api';

export const useRaceEditData = (id) => {
    const [race, setRace] = useState(null);
    const [status, setStatus] = useState('');
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRace(id)
            .then((data) => {
                setRace(data);
                setStatus(data.status);
                setTitle(data.title);
                // Format date as YYYY-MM-DD for a date input.
                setStartDate(new Date(data.start_date).toISOString().slice(0, 10));
                const initialParticipants = data.race_participants.map((p) => ({
                    id: p.id,
                    user_id: p.user_id,
                    lane: p.lane,
                    position: p.position || '',
                }));
                setParticipants(initialParticipants);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    return { race, status, setStatus, title, setTitle, startDate, setStartDate, participants, setParticipants, loading, error };
};
