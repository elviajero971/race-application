import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
            <h2 className="text-2xl font-bold mb-4">
                The page you are trying to visit does not exist.
            </h2>
            <p className="mb-8 text-gray-600">Please click the button below to return to the homepage.</p>
            <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                Go Back to Homepage
            </button>
        </div>
    );
};

export default NotFound;
