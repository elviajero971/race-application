import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import App from '../App';

// Dummy data to be returned by fetch
const dummyUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

const dummyRaces = [
    { id: 1, title: 'Race 1', start_date: '2025-01-01', race_participants: [] },
    { id: 2, title: 'Race 2', start_date: '2025-02-01', race_participants: [] },
];

beforeEach(() => {
    global.fetch = jest.fn((url) => {
        const parsedUrl = new URL(url, 'http://localhost');
        if (parsedUrl.pathname === '/api/v1/users') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(dummyUsers),
            });
        }
        if (parsedUrl.pathname === '/api/v1/races') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(dummyRaces),
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

describe('App routing', () => {
    test('renders RacesIndex on root path "/"', async () => {
        await act(async () => {
            window.history.pushState({}, 'Races Page', '/');
            render(<App />);
        });
        expect(screen.getByText(/List of races/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Race 1')).toBeInTheDocument();
            expect(screen.getByText('Go to races')).toBeInTheDocument();
            expect(screen.getByText('Go to users')).toBeInTheDocument();
        });
    });

    test('renders UsersIndex on "/users"', async () => {
        await act(async () => {
            window.history.pushState({}, 'Users Page', '/users');
            render(<App />);
        });
        expect(screen.getByText('List of users')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Bob')).toBeInTheDocument();
            expect(screen.getByText('Go to races')).toBeInTheDocument();
            expect(screen.getByText('Go to users')).toBeInTheDocument();
        });
    });

    test('renders NotFound for an unknown route', async () => {
        await act(async () => {
            window.history.pushState({}, 'Not Found', '/unknown');
            render(<App />);
        });
        await waitFor(() => {
            expect(screen.queryByText(/The page you/i)).toBeInTheDocument();
            expect(screen.queryByText(/Go to races/i)).toBeNull();
            expect(screen.queryByText(/Go to users/i)).toBeNull();
        });
    });
});