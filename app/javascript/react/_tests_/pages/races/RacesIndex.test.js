import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import RacesIndex from '../../../pages/races/RacesIndex';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from '../../../context/NotificationContext';

const dummyRaces = [
    {
        id: 1,
        title: 'Race 1',
        start_date: '2025-01-01',
        race_participants: [
            { id: 101, user_id: 1, lane: 1 },
            { id: 102, user_id: 2, lane: 2 }
        ],
    },
    {
        id: 2,
        title: 'Race 2',
        start_date: '2025-02-01',
        race_participants: [],
    },
];

beforeEach(() => {
    global.fetch = jest.fn((url, options) => {
        const parsedUrl = new URL(url, 'http://localhost');
        if (!options || options.method === 'GET') {
            if (parsedUrl.pathname === '/api/v1/races') {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            ok: true,
                            json: () => Promise.resolve(dummyRaces),
                        });
                    }, 1000); // 1-second delay
                });
            }
        }

        if (options && options.method === 'DELETE' && parsedUrl.pathname === '/api/v1/races/1') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Race deleted successfully' }),
            });
        }

        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'Not Found' }),
        });
    });
});

afterEach(() => {
    jest.resetAllMocks();
});

const renderWithProviders = (ui) =>
    render(
        <NotificationProvider>
            <BrowserRouter>{ui}</BrowserRouter>
        </NotificationProvider>
    );

describe('RacesIndex component', () => {
    test('displays loading spinner while fetching races and then renders race titles', async () => {
        renderWithProviders(<RacesIndex />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Race 1')).toBeInTheDocument();
            expect(screen.getByText('Race 2')).toBeInTheDocument();
        }, { timeout: 2000 });

        expect(screen.queryByTestId('spinner')).toBeNull();
    });

    test('handles delete race action', async () => {
        global.fetch.mockImplementation((url, options) => {
            const parsedUrl = new URL(url, 'http://localhost');
            if (options && options.method === 'DELETE' && parsedUrl.pathname === '/api/v1/races/1') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ message: 'Race deleted successfully' }),
                });
            }
            if (!options || options.method === 'GET') {
                if (parsedUrl.pathname === '/api/v1/races') {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve(dummyRaces),
                    });
                }
            }
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Not Found' }),
            });
        });

        renderWithProviders(<RacesIndex />);

        await waitFor(() => {
            expect(screen.getByText('Race 1')).toBeInTheDocument();
        }, { timeout: 2000 });

        const deleteButtons = screen.getAllByRole('button', { name: /Delete race/i });
        const firstDeleteButton = deleteButtons[0];
        fireEvent.click(firstDeleteButton);

        window.confirm = jest.fn(() => true);

        await act(async () => {
            fireEvent.click(firstDeleteButton);
        });

        await waitFor(() => {
            expect(screen.queryByText('Race 1')).toBeNull();
        });
    });
});