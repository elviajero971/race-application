import React from 'react';
import NotFound from '../pages/NotFound';

const NoNavBarLayout = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
            <NotFound />
        </div>
    );
};

export default NoNavBarLayout;