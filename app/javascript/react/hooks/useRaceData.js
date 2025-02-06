import { useState, useEffect, useCallback } from 'react';
import { fetchRace } from '../api/races_api';

export const useRaceData = (raceId) => {
    const [race, setRace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadRaceData = useCallback(async () => {
        try {
            const raceData = await fetchRace(raceId);
            // The raceData now includes race_participants with nested user info.
            setRace(raceData);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, [raceId]);

    useEffect(() => {
        loadRaceData();
    }, [loadRaceData]);

    return { race, loading, error };
};
