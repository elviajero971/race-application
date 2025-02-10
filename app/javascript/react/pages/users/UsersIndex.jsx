import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../api/users_api';
import Message from '../../components/Message';
import { DeleteIcon, UpdateIcon } from "../../components/Icons";

const UsersIndex = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const result = await deleteUser(id);
                if (result && result.message) {
                    setNotification(result.message);
                } else {
                    setNotification("User deleted successfully");
                }
                setUsers(users.filter(user => user.id !== id));
            } catch (err) {
                setNotification(err.message);
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-4">Loading users...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className='relative w-full max-w-3xl mx-auto'>
            {notification && (
                <Message
                    message={notification}
                    type="success"
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="mt-8">
                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold mb-4">Users</h2>
                    <Link
                        to="/users/new"
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Create a new user
                    </Link>
                </div>
                {users.length === 0 ? (
                    <div className="text-center text-gray-600">No users yet. Create the first one.</div>
                ) : (
                    <ul className="space-y-4">
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className="flex items-center justify-between border rounded p-4 shadow"
                            >
                                <div className="flex items-center space-x-6">
                                    <div>
                                        <p className="text-lg font-semibold">{user.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="px-3 py-1"
                                        onClick={() => navigate(`/users/${user.id}/edit`)}
                                        aria-label="Update user"
                                    >
                                        <UpdateIcon/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="px-3 py-1"
                                        aria-label="Delete user"
                                    >
                                        <DeleteIcon/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UsersIndex;
