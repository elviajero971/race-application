import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser, updateUser } from '../../api/users_api';
import { useNotification } from '../../context/NotificationContext';
import ErrorMessage from "../../components/ErrorMessage";

const UserUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [errorMessage, setErrorMessage] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm();

    // Fetch user data and initialize form
    useEffect(() => {
        fetchUser(id)
            .then((user) => {
                reset({ name: user.name });
            })
            .catch((err) => {
                setErrorMessage(err.message);
            });
    }, [id, reset, showNotification]);

    const onSubmit = async (data) => {
        try {
            await updateUser(id, data);
            showNotification("User updated successfully", "success");
            navigate('/users');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                const backendErrors = err.response.data.errors;
                Object.keys(backendErrors).forEach((field) => {
                    setError(field, {
                        type: "server",
                        message: backendErrors[field].join(", "),
                    });
                });
            } else {
                setErrorMessage(err.message);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <ErrorMessage message={errorMessage} />
                <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', {
                            required: "Name is required",
                            minLength: { value: 3, message: "Name must be at least 3 characters" },
                        })}
                        className="border rounded p-2 w-full"
                    />
                    <ErrorMessage message={errors?.name?.message} />
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
