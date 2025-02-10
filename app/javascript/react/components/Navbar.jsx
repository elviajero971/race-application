import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const { pathname } = useLocation();

    const activeClasses = "px-4 py-2 bg-blue-500 text-white rounded transition-colors duration-200";
    const inactiveClasses = "px-4 py-2 text-blue-500 hover:bg-blue-100 rounded transition-colors duration-200";

    const isRaceActive = pathname.startsWith("/race") || pathname === "/";
    const isUserActive = pathname.startsWith("/user");

    return (
        <nav className="my-5">
            <ul className="flex gap-4">
                <li>
                    <Link to="/" className={isRaceActive ? activeClasses : inactiveClasses}>
                        List of races
                    </Link>
                </li>
                <li>
                    <Link to="/users" className={isUserActive ? activeClasses : inactiveClasses}>
                        List of users
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
