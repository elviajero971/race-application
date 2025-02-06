import React from 'react';

const ParticipantEditRow = ({ participant, index, onChange }) => {
    return (
        <div key={participant.id} className="border p-4 rounded shadow-sm bg-gray-50 mb-4">
            <p>
                <strong>User ID:</strong> {participant.user_id}
            </p>
            <div className="mt-2">
                <label htmlFor={`lane-${participant.id}`} className="block font-medium">
                    Lane:
                </label>
                <input
                    id={`lane-${participant.id}`}
                    type="number"
                    value={participant.lane}
                    onChange={(e) => onChange(index, 'lane', e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                    min="1"
                />
            </div>
            <div className="mt-2">
                <label htmlFor={`position-${participant.id}`} className="block font-medium">
                    Position:
                </label>
                <input
                    id={`position-${participant.id}`}
                    type="number"
                    value={participant.position}
                    onChange={(e) => onChange(index, 'position', e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                    min="1"
                />
            </div>
        </div>
    );
};

export default ParticipantEditRow;
