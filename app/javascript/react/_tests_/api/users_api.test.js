import {
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
} from '../../api/users_api'; // adjust the path as needed

// Clear any previous mock on global fetch
global.fetch = jest.fn();

describe('users_api', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    describe('fetchUsers', () => {
        it('returns users when response is ok', async () => {
            const mockUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUsers,
            });

            const result = await fetchUsers();
            expect(result).toEqual(mockUsers);
            expect(fetch).toHaveBeenCalledWith('/api/v1/users');
        });

        it('throws an error when response is not ok', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
            });
            await expect(fetchUsers()).rejects.toThrow('Error fetching users');
        });
    });

    describe('fetchUser', () => {
        it('returns a user when response is ok', async () => {
            const mockUser = { id: 1, name: 'Alice' };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            const result = await fetchUser(1);
            expect(result).toEqual(mockUser);
            expect(fetch).toHaveBeenCalledWith('/api/v1/users/1');
        });

        it('throws an error when response is not ok', async () => {
            fetch.mockResolvedValueOnce({ ok: false });
            await expect(fetchUser(1)).rejects.toThrow('Error fetching user');
        });
    });

    describe('createUser', () => {
        it('returns the created user when response is ok', async () => {
            const userData = { name: 'Alice' };
            const mockUser = { id: 1, name: 'Alice' };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            const result = await createUser(userData);
            expect(result).toEqual(mockUser);
            expect(fetch).toHaveBeenCalledWith('/api/v1/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: userData }),
            });
        });

        it('throws an error with backend error message when response is not ok', async () => {
            const userData = { name: 'Alice' };
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ errors: ['Error creating user'] }),
            });
            await expect(createUser(userData)).rejects.toThrow('Error creating user');
        });
    });

    describe('updateUser', () => {
        it('returns the updated user when response is ok', async () => {
            const userData = { name: 'Alice Updated' };
            const mockUser = { id: 1, name: 'Alice Updated' };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            const result = await updateUser(1, userData);
            expect(result).toEqual(mockUser);
            expect(fetch).toHaveBeenCalledWith('/api/v1/users/1', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: userData }),
            });
        });

        it('throws an error with backend error message when response is not ok', async () => {
            const userData = { name: 'Alice Updated' };
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ errors: ['Error updating user'] }),
            });
            await expect(updateUser(1, userData)).rejects.toThrow('Error updating user');
        });
    });

    describe('deleteUser', () => {
        it('returns a success message when delete is successful', async () => {
            const mockResponse = { message: 'User deleted successfully' };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await deleteUser(1);
            expect(result).toEqual(mockResponse);
            expect(fetch).toHaveBeenCalledWith('/api/v1/users/1', { method: 'DELETE' });
        });

        it('throws an error with backend error message when delete fails', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ errors: ['Error deleting user'] }),
            });
            await expect(deleteUser(1)).rejects.toThrow('Error deleting user');
        });
    });
});
