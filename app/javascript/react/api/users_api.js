export const fetchUsers = async () => {
    try {
        const response = await fetch('/api/v1/users');
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchUser = async (id) => {
    try {
        const response = await fetch(`/api/v1/users/${id}`);
        if (!response.ok) {
            throw new Error('Error fetching user');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await fetch('/api/v1/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: userData }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Error creating user');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await fetch(`/api/v1/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: userData }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Error updating user');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`/api/v1/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Error deleting user');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};