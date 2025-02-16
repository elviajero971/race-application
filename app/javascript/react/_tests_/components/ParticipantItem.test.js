import React from 'react';
import { render, screen } from '@testing-library/react';
import ParticipantItem from '../../components/ParticipantItem';

jest.mock('../../components/Icons', () => ({
    LaneIcon: () => <svg data-testid="lane-icon" />,
    MedalIcon: () => <svg data-testid="medal-icon" />,
}));

describe('ParticipantItem component', () => {
    test('renders participant details correctly when position is provided', () => {
        const participant = {
            user: { name: 'Alice' },
            lane: 1,
            position: 2,
        };

        render(<ParticipantItem participant={participant} />);

        // Check the user's name is displayed
        expect(screen.getByText('Alice')).toBeInTheDocument();

        // Check the lane value is displayed
        expect(screen.getByText('1')).toBeInTheDocument();

        // Check that the lane icon is rendered
        expect(screen.getByTestId('lane-icon')).toBeInTheDocument();

        // Check that the medal icon is rendered
        expect(screen.getByTestId('medal-icon')).toBeInTheDocument();

        // Check that the position value is displayed
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('renders "N/A" when participant position is not provided', () => {
        const participant = {
            user: { name: 'Bob' },
            lane: 3,
            position: null,
        };

        render(<ParticipantItem participant={participant} />);

        // Check the user's name is displayed
        expect(screen.getByText('Bob')).toBeInTheDocument();

        // Check the lane value is displayed
        expect(screen.getByText('3')).toBeInTheDocument();

        // Check that the medal icon is rendered
        expect(screen.getByTestId('medal-icon')).toBeInTheDocument();

        // Check that "N/A" is rendered for missing position
        expect(screen.getByText('N/A')).toBeInTheDocument();
    });
});
