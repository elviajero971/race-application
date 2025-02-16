import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

describe('Navbar component', () => {
    const renderWithRoute = (route) =>
        render(
            <MemoryRouter initialEntries={[route]}>
                <Navbar />
            </MemoryRouter>
        );

    test('renders active link for "List of races" when at the root path "/"', () => {
        renderWithRoute('/');
        const racesLink = screen.getByText(/List of races/i);
        expect(racesLink).toHaveClass('bg-blue-500');
        const usersLink = screen.getByText(/List of users/i);
        expect(usersLink).not.toHaveClass('bg-blue-500');
    });

    test('renders active link for "List of races" when path starts with "/race"', () => {
        renderWithRoute('/race/123');
        const racesLink = screen.getByText(/List of races/i);
        expect(racesLink).toHaveClass('bg-blue-500');
    });

    test('renders active link for "List of users" when path starts with "/user"', () => {
        renderWithRoute('/user/profile');
        const usersLink = screen.getByText(/List of users/i);
        expect(usersLink).toHaveClass('bg-blue-500');
        const racesLink = screen.getByText(/List of races/i);
        expect(racesLink).not.toHaveClass('bg-blue-500');
    });
});
