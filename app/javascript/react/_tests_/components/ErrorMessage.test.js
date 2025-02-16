import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../../components/ErrorMessage';

describe('ErrorMessage component', () => {
    test('renders nothing when no message is provided', () => {
        const { container } = render(<ErrorMessage message={null} />);
        expect(container.firstChild).toBeNull();
    });

    test('renders the error message when provided', () => {
        const testMessage = 'This is an error message';
        render(<ErrorMessage message={testMessage} />);

        const errorElement = screen.getByText(testMessage);

        expect(errorElement).toBeInTheDocument();

        expect(errorElement).toHaveClass('text-red-500');
        expect(errorElement).toHaveClass('mt-1');
        expect(errorElement).toHaveClass('text-sm');
    });
});
