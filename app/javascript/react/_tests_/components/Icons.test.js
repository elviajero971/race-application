import React from 'react';
import { render } from '@testing-library/react';
import {
    ViewDetailsIcon,
    DeleteIcon,
    UpdateIcon,
    UserIcon,
    LaneIcon,
    MedalIcon,
} from '../../components/Icons';

describe('Icon components', () => {
    test('ViewDetailsIcon renders with correct classes', () => {
        const { container } = render(<ViewDetailsIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveClass('text-blue-500');
        expect(svgElement).toHaveClass('hover:text-blue-700');
        expect(svgElement).toHaveClass('transition-colors');
        expect(svgElement).toHaveClass('duration-200');
        expect(svgElement).toHaveClass('transform');
        expect(svgElement).toHaveClass('hover:scale-110');
    });

    test('DeleteIcon renders with correct classes', () => {
        const { container } = render(<DeleteIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveClass('text-red-500');
        expect(svgElement).toHaveClass('hover:text-red-700');
        expect(svgElement).toHaveClass('transition-colors');
        expect(svgElement).toHaveClass('duration-200');
        expect(svgElement).toHaveClass('transform');
        expect(svgElement).toHaveClass('hover:scale-110');
    });

    test('UpdateIcon renders with correct classes', () => {
        const { container } = render(<UpdateIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveClass('text-blue-500');
        expect(svgElement).toHaveClass('hover:text-blue-700');
        expect(svgElement).toHaveClass('transition-colors');
        expect(svgElement).toHaveClass('duration-200');
        expect(svgElement).toHaveClass('transform');
        expect(svgElement).toHaveClass('hover:scale-110');
    });

    test('UserIcon renders with correct classes', () => {
        const { container } = render(<UserIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveClass('text-blue-500');
    });

    test('LaneIcon renders with correct classes', () => {
        const { container } = render(<LaneIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        // Check that it has the margin-right and green text classes
        expect(svgElement).toHaveClass('mr-1');
        expect(svgElement).toHaveClass('text-green-500');
    });

    test('MedalIcon renders with correct classes', () => {
        const { container } = render(<MedalIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveClass('mr-1');
        expect(svgElement).toHaveClass('text-yellow-500');
    });
});
