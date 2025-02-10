import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser, updateUser } from '../../api/users_api';
import { useNotification } from '../../context/NotificationContext';

const UserUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUser(id)
            .then(user => {
                setName(user.name);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                showNotification(err.message, 'error');
                setLoading(false);
            });
    }, [id, showNotification]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, { name });
            showNotification("User updated successfully", "success");
            navigate('/users');
        } catch (err) {
            setError(err.message);
            showNotification("An error occurred, user couldn't be updated", 'error');
        }
    };

    if (loading) return <div className="text-center mt-8">Loading user data...</div>;

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            {error && <div className="mb-4 text-red-500">Error: {error}</div>}
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
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Update user
                </button>
            </form>
        </div>
    );
};

export default UserUpdate;
