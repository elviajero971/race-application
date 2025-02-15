import React from 'react';
import { useFieldArray } from 'react-hook-form';
import ParticipantRow from './ParticipantRow';

const ParticipantsField = ({ control, register, errors, users, showParticipantPosition = true }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'race_participants_attributes'
    });

    return (
        <div>
            <h3 className="font-medium mb-2">Participants</h3>
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <ParticipantRow
                        key={field.id}
                        index={index}
                        register={register}
                        errors={errors}
                        users={users}
                        onRemove={remove}
                        showParticipantPosition={showParticipantPosition}
                    />
                ))}
            </div>
            <button
                type="button"
                onClick={() => append({ user_id: '', lane: '', position: '' })}
                className="mt-2 text-blue-500 hover:underline"
            >
                Add Participant
            </button>
        </div>
    );
};

export default ParticipantsField;
