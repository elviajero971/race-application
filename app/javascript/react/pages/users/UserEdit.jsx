import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser, updateUser } from '../../api/users_api';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user details based on the ID from the URL
        fetchUser(id)
            .then(user => {
                setName(user.name);
                setEmail(user.email);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call your API to update the user
            await updateUser(id, { name, email });
            // Navigate to the user's detail page after updating
            navigate(`/users/${id}`);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading user data...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
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
                <div>
                    <label className="block mb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Update User
                </button>
            </form>
        </div>
    );
};

export default UserEdit;
