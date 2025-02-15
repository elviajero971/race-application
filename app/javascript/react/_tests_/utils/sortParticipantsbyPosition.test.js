import { sortParticipantsByPosition } from '../../utils/sortParticipantsByPosition';

describe('sortParticipantsByPosition', () => {
    it('should sort participants by their numeric position, treating missing positions as MAX_SAFE_INTEGER', () => {
        const participants = [
            { name: 'Alice', position: '3' },
            { name: 'Bob', position: '1' },
            { name: 'Carol', position: '2' },
            { name: 'Dave', position: null },
            { name: 'Eve' } // no position
        ];

        const sorted = sortParticipantsByPosition(participants);

        expect(sorted[0].name).toBe('Bob');
        expect(sorted[1].name).toBe('Carol');
        expect(sorted[2].name).toBe('Alice');

        const lastTwoNames = [sorted[3].name, sorted[4].name];
        expect(lastTwoNames).toEqual(expect.arrayContaining(['Dave', 'Eve']));
    });

    it('should not modify the original array', () => {
        const participants = [
            { name: 'Alice', position: '2' },
            { name: 'Bob', position: '1' },
        ];
        const original = [...participants];
        sortParticipantsByPosition(participants);
        expect(participants).toEqual(original);
    });
});
