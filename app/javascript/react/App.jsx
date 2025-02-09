// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import RacesIndex from './pages/races/RacesIndex';
import RaceShow from './pages/races/RaceShow';
import RaceNew from './pages/races/RaceNew';
import RaceEdit from './pages/races/RaceEdit';
import UsersIndex from "./pages/users/UsersIndex";
import UserNew from "./pages/users/UserNew";
import UserEdit from "./pages/users/UserEdit";

const App = () => {
    return (
        <Router>
            <div className="text-center min-h-screen flex flex-col items-center justify-start box-border bg-white mx-5 mb-5">
                <h1 className="text-4xl font-bold text-gray-800 mt-5">Race management dashboard</h1>
                <Navbar />
                <Routes>
                    <Route path="/" element={<RacesIndex />} />
                    <Route path="/races/new" element={<RaceNew />} />
                    <Route path="/races/:id/edit" element={<RaceEdit />} />
                    <Route path="/races/:id" element={<RaceShow />} />
                    <Route path="/users" element={<UsersIndex />} />
                    <Route path="/users/new" element={<UserNew />} />
                    <Route path="/users/:id/edit" element={<UserEdit />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
