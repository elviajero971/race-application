import React from 'react';
import ErrorMessage from '../ErrorMessage';

const RaceDateField = ({ register, error }) => (
    <div>
        <label htmlFor="start_date" className="block font-medium mb-1">Start Date:</label>
        <input
            id="start_date"
            type="date"
            {...register('start_date', { required: "Start date is required" })}
            className="border rounded p-2 w-full"
        />
        <ErrorMessage message={error?.message} />
    </div>
);

export default RaceDateField;
