import React from 'react';
import { render, screen } from '@testing-library/react';
import RaceStatusField from '../../../components/raceFields/RaceStatusField';

const dummyRegister = jest.fn().mockReturnValue({});

describe('RaceStatusField', () => {
    beforeEach(() => {
        dummyRegister.mockClear();
    });

    test('renders the label and select input with correct options', () => {
        render(<RaceStatusField register={dummyRegister} error={null} />);

        // Check the label is rendered.
        const label = screen.getByText(/Race Status:/i);
        expect(label).toBeInTheDocument();

        // Since the label is associated with the select via htmlFor="status", we can query by label text.
        const selectElement = screen.getByLabelText(/Race Status:/i);
        expect(selectElement).toBeInTheDocument();
        expect(selectElement.tagName).toBe('SELECT');

        // Check that the register function was called with the proper arguments.
        expect(dummyRegister).toHaveBeenCalledWith('status', { required: "Race status is required" });

        // Check that the select contains the options "Pending" and "Completed".
        expect(screen.getByRole('option', { name: /Pending/i })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: /Completed/i })).toBeInTheDocument();
    });

    test('displays an error message when error prop is provided', () => {
        const error = { message: 'Race status is required' };
        render(<RaceStatusField register={dummyRegister} error={error} />);
        expect(screen.getByText('Race status is required')).toBeInTheDocument();
    });

    test('does not render an error message when error prop is null', () => {
        render(<RaceStatusField register={dummyRegister} error={null} />);
        expect(screen.queryByText('Race status is required')).toBeNull();
    });
});
