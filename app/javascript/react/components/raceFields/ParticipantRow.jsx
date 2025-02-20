import React from 'react';
import ErrorMessage from '../ErrorMessage';

const ParticipantRow = ({
                            index,
                            register,
                            users,
                            errors,
                            onRemove,
                            showParticipantPosition = true
                        }) => (
    <div className="grid grid-cols-3 gap-4 items-center border p-4 rounded shadow-sm bg-gray-50">
        <div>
            <label htmlFor={`race_participants_attributes.${index}.user_id`} className="block text-sm font-medium">
                User
            </label>
            <select
                id={`race_participants_attributes.${index}.user_id`}
                name={`race_participants_attributes[${index}].user_id`}
                {...register(`race_participants_attributes.${index}.user_id`, { required: "User is required" })}
                className="border rounded p-2 w-full"
            >
                <option value="">Select a user</option>
                {users.map(u => (
                    <option key={u.id} value={u.id}>
                        {u.name}
                    </option>
                ))}
            </select>
            <ErrorMessage message={errors?.race_participants_attributes?.[index]?.user_id?.message} />
        </div>

        <div>
            <label htmlFor={`race_participants_attributes.${index}.lane`} className="block text-sm font-medium">
                Lane
            </label>
            <input
                id={`race_participants_attributes.${index}.lane`}
                type="number"
                {...register(`race_participants_attributes.${index}.lane`, {
                    required: "Lane is required",
                    min: { value: 1, message: "Lane must be >= 1" }
                })}
                className="border rounded p-2 w-full"
                min="1"
                onWheel={(e) => {
                    e.target.blur();
                    e.preventDefault();
                }}
            />
            <ErrorMessage message={errors?.race_participants_attributes?.[index]?.lane?.message} />
        </div>

        {showParticipantPosition && (
            <div>
                <label htmlFor={`race_participants_attributes.${index}.position`} className="block text-sm font-medium">
                    Position
                </label>
                <input
                    id={`race_participants_attributes.${index}.position`}
                    type="number"
                    {...register(`race_participants_attributes.${index}.position`, {
                        required: "Position is required",
                        min: { value: 1, message: "Position must be >= 1" }
                    })}
                    className="border rounded p-2 w-full"
                    min="1"
                    onWheel={(e) => {
                        e.target.blur();
                        e.preventDefault();
                    }}
                />
                <ErrorMessage message={errors?.race_participants_attributes?.[index]?.position?.message} />
            </div>
        )}

        <div className="col-span-3 text-right">
            <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:underline">
                Remove
            </button>
        </div>
    </div>
);

export default ParticipantRow;
