export const fetchRaces = async () => {
    try {
        const response = await fetch('/api/v1/races');
        if (!response.ok) {
            throw new Error('Error fetching races');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchRace = async (id) => {
    try {
        const response = await fetch(`/api/v1/races/${id}`);
        if (!response.ok) {
            throw new Error('Error fetching race');
        }
        return await response.json();
    } catch (error) {
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

export const updateRace = async (id, raceData) => {
    try {
        const response = await fetch(`/api/v1/races/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ race: raceData }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Error updating race');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteRace = async (id) => {
    try {
        const response = await fetch(`/api/v1/races/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Error deleting race');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};



