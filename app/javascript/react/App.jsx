// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RacesIndex from './pages/RacesIndex';
import RaceShow from './pages/RaceShow';
import RaceNew from './pages/RaceNew';
import RaceEdit from './pages/RaceEdit';

const App = () => {
    return (
        <Router>
            <div className="text-center min-h-screen flex flex-col items-center justify-start box-border bg-white mx-5 mb-5">
                <h1 className="text-4xl font-bold text-gray-800 mt-5">Race Dashboard</h1>
                <nav className="mt-4">
                    <Link to="/" className="mx-2 text-blue-500 hover:underline">
                        Races
                    </Link>
                    <Link to="/races/new" className="mx-2 text-blue-500 hover:underline">
                        Create a new race
                    </Link>
                </nav>
                <Routes>
                    <Route path="/" element={<RacesIndex />} />
                    <Route path="/races/new" element={<RaceNew />} />
                    <Route path="/races/:id/edit" element={<RaceEdit />} />
                    <Route path="/races/:id" element={<RaceShow />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
