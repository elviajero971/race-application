import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ParticipantItem from '../components/ParticipantItem';
import { sortParticipantsByPosition } from '../utils/sortParticipants';
import { useRaceData } from '../hooks/useRaceData';
import { dateFormating } from '../utils/dataFormating';

const RaceShow = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { race, loading, error } = useRaceData(id);

    if (loading) {
        return <div className="text-center mt-4">Loading race details...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
    }

    if (!race) {
        return <div className="text-center mt-4">No race found.</div>;
    }

    const sortedParticipants = sortParticipantsByPosition(race.race_participants);

    return (
        <div className="w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Race: {race.title}</h2>
            <p className="text-lg mb-2">Status: {race.status}</p>
            <p className="text-sm text-gray-600 mb-4">
                {dateFormating(race.start_date)}
            </p>

            <h3 className="text-xl font-semibold mb-2">Participants</h3>
            {sortedParticipants && sortedParticipants.length > 0 ? (
                <ul className="space-y-3">
                    {sortedParticipants.map((participant) => (
                        <ParticipantItem
                            key={participant.id}
                            participant={participant}
                        />
                    ))}
                </ul>
            ) : (
                <p>No participants for this race.</p>
            )}

            <div className="flex gap-4 mt-6">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    onClick={() => navigate('/')}
                >
                    Back to Races
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => navigate(`/races/${race.id}/edit`)}
                >
                    Edit Race
                </button>
            </div>
        </div>
    );
};

export default RaceShow;
