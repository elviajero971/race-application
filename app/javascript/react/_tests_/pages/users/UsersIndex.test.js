import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import UsersIndex from '../../../pages/users/UsersIndex';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from '../../../context/NotificationContext';

const dummyUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

beforeEach(() => {
    global.fetch = jest.fn((url) => {
        const parsedUrl = new URL(url, 'http://localhost');
        if (parsedUrl.pathname === '/api/v1/users') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        ok: true,
                        json: () => Promise.resolve(dummyUsers),
                    });
                }, 1000); // 1-second delay to simulate loading
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

describe('UsersIndex component', () => {
    test('displays loading spinner while fetching users and then renders user names', async () => {
        renderWithProviders(<UsersIndex />);

        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Bob')).toBeInTheDocument();
        }, { timeout: 2000 });

        expect(screen.queryByTestId('spinner')).toBeNull();
    });

    test('handles delete user action', async () => {
        window.confirm = jest.fn(() => true);
        renderWithProviders(<UsersIndex />);

        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Bob')).toBeInTheDocument();

        }, { timeout: 2000 });

        const deleteButtons = screen.getAllByRole('button', { name: /Delete user/i });
        expect(deleteButtons.length).toBeGreaterThan(0);

        await act(async () => {
            fireEvent.click(deleteButtons[0]);
        });

        await waitFor(() => {
            expect(screen.queryByText('Alice')).toBeNull();
            expect(screen.getByText('Bob')).toBeInTheDocument();
        });
    });
});