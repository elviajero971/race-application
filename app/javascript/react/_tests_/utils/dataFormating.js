import { dateFormating } from '../../utils/dataFormating';

describe('dateFormating', () => {
    it('formats a valid date string into a locale date string', () => {
        const input = '2025-02-07';
        const expected = new Date(input).toLocaleDateString();
        expect(dateFormating(input)).toEqual(expected);
    });

    it('returns a string even if the date is invalid', () => {
        const input = 'invalid-date';
        const result = dateFormating(input);
        expect(typeof result).toBe('string');
        expect(result.toLowerCase()).toContain('invalid');
    });
});
