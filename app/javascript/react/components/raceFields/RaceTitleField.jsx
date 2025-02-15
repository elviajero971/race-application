import React from 'react';
import ErrorMessage from '../ErrorMessage';

const RaceTitleField = ({ register, error }) => (
    <div>
        <label htmlFor="title" className="block font-medium mb-1">Race Title:</label>
        <input
            id="title"
            type="text"
            {...register('title', { required: "Race title is required", minLength: { value: 3, message: "Title must be at least 3 characters" } })}
            className="border rounded p-2 w-full"
        />
        <ErrorMessage message={error?.message} />
    </div>
);

export default RaceTitleField;
