import React from 'react';

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return <p className="text-red-500 mt-1 text-sm">{message}</p>;
};

export default ErrorMessage;
