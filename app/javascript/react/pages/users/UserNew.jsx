import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/users_api';
import { useNotification } from '../../context/NotificationContext';

const UserNew = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const { showNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit triggered"); // Check that the form submission works
        try {
            await createUser({ name });
            showNotification('User created successfully', 'success');
            navigate('/users');
        } catch (err) {
            setError(err.message);
            showNotification('An error occurred, user could not be created', 'error');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Create a New User</h2>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1" htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Create User
                </button>
            </form>
        </div>
    );
};

export default UserNew;
