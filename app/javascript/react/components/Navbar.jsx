import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="my-5">
            <ul className="flex gap-4">
                {location.pathname !== '/users' && (
                    <li>
                        <Link to="/users" className="text-blue-500 hover:underline">
                            List of users
                        </Link>
                    </li>
                )}

                {location.pathname !== '/' && (
                    <li>
                        <Link to="/" className="text-blue-500 hover:underline">
                            List of races
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
