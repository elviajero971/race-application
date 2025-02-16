import React from 'react';
import { render, screen } from '@testing-library/react';
import RaceDateField from '../../../components/raceFields/RaceDateField';

const dummyRegister = jest.fn().mockReturnValue({});

describe('RaceDateField', () => {
    beforeEach(() => {
        dummyRegister.mockClear();
    });

    test('renders the label and date input correctly', () => {
        render(<RaceDateField register={dummyRegister} error={null} />);

        // Check that the label is rendered.
        const label = screen.getByText(/Start Date:/i);
        expect(label).toBeInTheDocument();

        // Query the input by its label.
        const dateInput = screen.getByLabelText(/Start Date:/i);
        expect(dateInput).toBeInTheDocument();
        expect(dateInput).toHaveAttribute('type', 'date');

        // Verify that the register function was called with the expected arguments.
        expect(dummyRegister).toHaveBeenCalledWith('start_date', { required: "Start date is required" });
    });

    test('displays an error message when error prop is provided', () => {
        const error = { message: 'Start date is required' };
        render(<RaceDateField register={dummyRegister} error={error} />);
        expect(screen.getByText('Start date is required')).toBeInTheDocument();
    });

    test('does not render an error message when error prop is null', () => {
        render(<RaceDateField register={dummyRegister} error={null} />);
        expect(screen.queryByText('Start date is required')).toBeNull();
    });
});
