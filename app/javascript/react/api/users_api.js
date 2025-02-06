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