import React from 'react';
import { useFieldArray } from 'react-hook-form';

const ParticipantsField = ({ control, register, errors, users }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "race_participants_attributes"
    });
    return (
        <div>
            <h3 className="font-medium mb-2">Participants</h3>
            {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-3 gap-4 items-center mb-2">
                    <div>
                        <label
                            htmlFor={`race_participants_attributes.${index}.user_id`}
                            className="block text-sm font-medium"
                        >
                            User
                        </label>
                        <select
                            id={`race_participants_attributes.${index}.user_id`}
                            {...register(`race_participants_attributes.${index}.user_id`, {
                                required: "User is required"
                            })}
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
                        {errors.race_participants_attributes &&
                            errors.race_participants_attributes[index] &&
                            errors.race_participants_attributes[index].user_id && (
                                <p className="text-red-500">
                                    {errors.race_participants_attributes[index].user_id.message}
                                </p>
                            )}
                    </div>
                    <div>
                        <label
                            htmlFor={`race_participants_attributes.${index}.lane`}
                            className="block text-sm font-medium"
                        >
                            Lane
                        </label>
                        <input
                            id={`race_participants_attributes.${index}.lane`}
                            type="number"
                            {...register(`race_participants_attributes.${index}.lane`, {
                                required: "Lane is required",
                                min: { value: 1, message: "Lane must be at least 1" }
                            })}
                            className="border rounded p-2 w-full"
                            min="1"
                        />
                        {errors.race_participants_attributes &&
                            errors.race_participants_attributes[index] &&
                            errors.race_participants_attributes[index].lane && (
                                <p className="text-red-500">
                                    {errors.race_participants_attributes[index].lane.message}
                                </p>
                            )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={() => append({ user_id: '', lane: '' })}
                className="mt-2 text-blue-500 hover:underline"
            >
                Add Participant
            </button>
        </div>
    );
};

export default ParticipantsField;
