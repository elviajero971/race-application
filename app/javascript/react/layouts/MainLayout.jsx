import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div className="text-center min-h-screen flex flex-col items-center justify-start box-border bg-white mx-5 mb-5">
            <h1 className="text-4xl font-bold text-gray-800 mt-5">Race management dashboard</h1>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;