export const sortParticipantsByPosition = (participants) => {
    return [...participants].sort((a, b) => {
        const posA = a.position ? parseInt(a.position, 10) : Number.MAX_SAFE_INTEGER;
        const posB = b.position ? parseInt(b.position, 10) : Number.MAX_SAFE_INTEGER;
        return posA - posB;
    });
};
