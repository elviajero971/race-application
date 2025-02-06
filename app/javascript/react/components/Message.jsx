import React, { useEffect } from 'react';

const Message = ({ message, type = 'default', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    let bgClass, textClass;
    switch (type) {
        case 'success':
            bgClass = 'bg-green-100';
            textClass = 'text-green-800';
            break;
        case 'error':
            bgClass = 'bg-red-100';
            textClass = 'text-red-800';
            break;
        default:
            bgClass = 'bg-gray-100';
            textClass = 'text-gray-800';
            break;
    }

    return (
        <div className={`absolute top-4 right-4 p-4 rounded shadow-md ${bgClass} ${textClass}`}>
            {message}
        </div>
    );
};

export default Message;
