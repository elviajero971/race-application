import React from 'react';

const RaceEditForm = ({
                          status,
                          setStatus,
                          title,
                          setTitle,
                          startDate,
                          setStartDate,
                          participants,
                          onParticipantChange,
                          onSubmit,
                          error,
                          users, // Array of available users to choose from
                      }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Race Details Fields */}
            <div>
                <label htmlFor="status" className="block font-medium mb-1">
                    Race Status:
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label htmlFor="title" className="block font-medium mb-1">
                    Race Title:
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="startDate" className="block font-medium mb-1">
                    Start Date:
                </label>
                <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>

            {/* Participants Section */}
            <div>
                <h3 className="font-medium mb-2">Participants</h3>
                <div className="space-y-4">
                    {participants.map((participant, index) => (
                        <div
                            key={participant.id || index}
                            className="grid grid-cols-3 gap-4 items-center border p-4 rounded shadow-sm bg-gray-50"
                        >
                            {/* User select column */}
                            <div>
                                <label
                                    htmlFor={`participant-${index}-user`}
                                    className="block text-sm font-medium"
                                >
                                    User
                                </label>
                                <select
                                    id={`participant-${index}-user`}
                                    value={participant.user_id}
                                    onChange={(e) =>
                                        onParticipantChange(index, 'user_id', e.target.value)
                                    }
                                    className="border rounded p-2 w-full"
                                    required
                                >
                                    <option value="">Select a user</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Lane column */}
                            <div>
                                <label
                                    htmlFor={`participant-${index}-lane`}
                                    className="block text-sm font-medium"
                                >
                                    Lane
                                </label>
                                <input
                                    id={`participant-${index}-lane`}
                                    type="number"
                                    value={participant.lane}
                                    onChange={(e) =>
                                        onParticipantChange(index, 'lane', e.target.value)
                                    }
                                    className="border rounded p-2 w-full"
                                    required
                                    min="1"
                                />
                            </div>
                            {/* Position column */}
                            <div>
                                <label
                                    htmlFor={`participant-${index}-position`}
                                    className="block text-sm font-medium"
                                >
                                    Position
                                </label>
                                <input
                                    id={`participant-${index}-position`}
                                    type="number"
                                    value={participant.position}
                                    onChange={(e) =>
                                        onParticipantChange(index, 'position', e.target.value)
                                    }
                                    className="border rounded p-2 w-full"
                                    required
                                    min="1"
                                />
                            </div>
                            {/* Remove button row */}
                            <div className="col-span-3 text-right">
                                <button
                                    type="button"
                                    onClick={() => onParticipantChange(index, 'remove')}
                                    className="text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
                Update Race
            </button>
        </form>
    );
};

export default RaceEditForm;
