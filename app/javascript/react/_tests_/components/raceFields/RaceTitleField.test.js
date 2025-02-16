import React from 'react';
import { render, screen } from '@testing-library/react';
import RaceTitleField from '../../../components/raceFields/RaceTitleField';

const dummyRegister = jest.fn().mockReturnValue({});

describe('RaceTitleField component', () => {
    beforeEach(() => {
        dummyRegister.mockClear();
    });

    test('renders the label and input field', () => {
        render(<RaceTitleField register={dummyRegister} error={null} />);

        const labelElement = screen.getByLabelText(/Race Title:/i);
        expect(labelElement).toBeInTheDocument();

        const inputElement = screen.getByRole('textbox', { name: /Race Title:/i });
        expect(inputElement).toBeInTheDocument();
    });

    test('calls register with the correct validation rules', () => {
        render(<RaceTitleField register={dummyRegister} error={null} />);

        expect(dummyRegister).toHaveBeenCalledWith('title', {
            required: "Race title is required",
            minLength: { value: 3, message: "Title must be at least 3 characters" },
        });
    });

    test('displays an error message when error prop is provided', () => {
        const error = { message: "Race title is required" };
        render(<RaceTitleField register={dummyRegister} error={error} />);

        expect(screen.getByText(error.message)).toBeInTheDocument();
    });

    test('does not render an error message when error prop is null', () => {
        render(<RaceTitleField register={dummyRegister} error={null} />);

        expect(screen.queryByText(/Race title is required/i)).toBeNull();
    });
});
