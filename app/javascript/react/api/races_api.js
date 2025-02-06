// src/api/races_api.js

export const fetchRaces = async () => {
    try {
        const response = await fetch('/api/v1/races');
        if (!response.ok) {
            throw new Error('Error fetching races');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('fetchRaces error:', error);
        throw error;
    }
};

export const fetchRace = async (id) => {
    try {
        const response = await fetch(`/api/v1/races/${id}`);
        if (!response.ok) {
            throw new Error('Error fetching race');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('fetchRace error:', error);
        throw error;
    }
};

export const createRace = async (raceData) => {
    try {
        const response = await fetch('/api/v1/races', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ race: raceData }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Error creating race');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// src/api/races_api.js

export const updateRace = async (id, raceData) => {
    try {
        const response = await fetch(`/api/v1/races/${id}`, {
            method: 'PUT', // or PATCH if you prefer
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ race: raceData }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.log('errorData:', errorData);
            throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Error updating race');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};


