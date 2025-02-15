import React from 'react';
import ErrorMessage from '../ErrorMessage';

const RaceStatusField = ({ register, error }) => (
    <div>
        <label htmlFor="status" className="block font-medium mb-1">Race Status:</label>
        <select
            id="status"
            {...register('status', { required: "Race status is required" })}
            className="border rounded p-2 w-full"
        >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
        </select>
        <ErrorMessage message={error?.message} />
    </div>
);

export default RaceStatusField;
