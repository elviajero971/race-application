import {
    fetchRaces,
    fetchRace,
    createRace,
    updateRace,
    deleteRace,
} from '../../api/races_api';

global.fetch = jest.fn();

describe('races_api', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    describe('fetchRaces', () => {
        it('returns race data when response is ok', async () => {
            const mockRaces = [
                { id: 1, title: 'Race 1' },
                { id: 2, title: 'Race 2' },
            ];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockRaces,
            });

            const data = await fetchRaces();
            expect(data).toEqual(mockRaces);
            expect(fetch).toHaveBeenCalledWith('/api/v1/races');
        });

        it('throws an error when response is not ok', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({}),
            });
            await expect(fetchRaces()).rejects.toThrow('Error fetching races');
        });
    });

    describe('fetchRace', () => {
        it('returns a race when response is ok', async () => {
            const mockRace = { id: 1, title: 'Race 1' };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockRace,
            });

            const data = await fetchRace(1);
            expect(data).toEqual(mockRace);
            expect(fetch).toHaveBeenCalledWith('/api/v1/races/1');
        });

        it('throws an error when response is not ok', async () => {
            fetch.mockResolvedValueOnce({ ok: false, json: async () => ({}) });
            await expect(fetchRace(1)).rejects.toThrow('Error fetching race');
        });
    });

    describe('createRace', () => {
        it('returns created race data when response is ok, including two participants', async () => {
            const raceData = {
                title: 'Race with participants',
                start_date: '2025-02-07',
                race_participants_attributes: [
                    { user_id: 1, lane: 1, position: 1 },
                    { user_id: 2, lane: 2, position: 2 },
                ],
            };
            const mockResponse = { id: 1, title: 'Race with participants' };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const data = await createRace(raceData);
            expect(data).toEqual(mockResponse);
            expect(fetch).toHaveBeenCalledWith('/api/v1/races', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ race: raceData }),
            });
        });

        it('throws an error with backend error message when response is not ok', async () => {
            const raceData = {
                title: 'Race with participants',
                start_date: '2025-02-07',
                race_participants_attributes: [
                    { user_id: 1, lane: 1, position: 1 },
                    { user_id: 2, lane: 2, position: 2 },
                ],
            };
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ errors: ['Error creating race'] }),
            });
            await expect(createRace(raceData)).rejects.toThrow('Error creating race');
        });
    });

    describe('updateRace', () => {
        it('returns updated race data when response is ok, including two participants', async () => {
            const raceId = 1;
            const raceData = {
                title: 'Updated Race',
                start_date: '2025-02-07',
                race_participants_attributes: [
                    { id: 10, user_id: 1, lane: 1, position: 1 },
                    { id: 11, user_id: 2, lane: 2, position: 2 },
                ],
            };
            const mockResponse = { id: raceId, title: 'Updated Race' };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const data = await updateRace(raceId, raceData);
            expect(data).toEqual(mockResponse);
            expect(fetch).toHaveBeenCalledWith(`/api/v1/races/${raceId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ race: raceData }),
            });
        });

        it('throws an error with backend error message when response is not ok', async () => {
            const raceId = 1;
            const raceData = {
                title: 'Updated Race',
                start_date: '2025-02-07',
                race_participants_attributes: [
                    { id: 10, user_id: 1, lane: 1, position: 1 },
                    { id: 11, user_id: 2, lane: 2, position: 2 },
                ],
            };
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ errors: ['Error updating race'] }),
            });
            await expect(updateRace(raceId, raceData)).rejects.toThrow('Error updating race');
        });
    });

    describe('deleteRace', () => {
        it('returns success message when deletion is successful', async () => {
            const raceId = 1;
            const mockResponse = { message: 'Race deleted successfully' };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const data = await deleteRace(raceId);
            expect(data).toEqual(mockResponse);
            expect(fetch).toHaveBeenCalledWith(`/api/v1/races/${raceId}`, { method: 'DELETE' });
        });

        it('throws an error when deletion fails', async () => {
            const raceId = 1;
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ errors: ['Error deleting race'] }),
            });
            await expect(deleteRace(raceId)).rejects.toThrow('Error deleting race');
        });
    });
});
