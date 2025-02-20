import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import MainLayout from './layouts/MainLayout';
import RacesIndex from './pages/races/RacesIndex';
import RaceShow from './pages/races/RaceShow';
import RaceNew from './pages/races/RaceNew';
import RaceUpdate from './pages/races/RaceUpdate';
import UsersIndex from './pages/users/UsersIndex';
import UserNew from './pages/users/UserNew';
import UserUpdate from './pages/users/UserUpdate';
import NoNavBarLayout from './layouts/NoNavBarLayout';

const App = () => {
    return (
        <NotificationProvider>
            <Router>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<RacesIndex />} />
                        <Route path="/races/new" element={<RaceNew />} />
                        <Route path="/races/:id/edit" element={<RaceUpdate />} />
                        <Route path="/races/:id" element={<RaceShow />} />
                        <Route path="/users" element={<UsersIndex />} />
                        <Route path="/users/new" element={<UserNew />} />
                        <Route path="/users/:id/edit" element={<UserUpdate />} />
                    </Route>
                    <Route path="*" element={<NoNavBarLayout />} />
                    <Route path="/notfound" element={<NoNavBarLayout />} />
                </Routes>
            </Router>
        </NotificationProvider>
    );
};

export default App;