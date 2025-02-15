import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/users_api';
import { useNotification } from '../../context/NotificationContext';
import ErrorMessage from '../../components/ErrorMessage';

const UserNew = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [errorMessage, setErrorMessage] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm({
        defaultValues: {
            name: '',
        },
    });


    const onSubmit = async (data) => {
        try {
            await createUser(data);
            showNotification('User created successfully', 'success');
            navigate('/users');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                const errorMsg = Object.values(err.response.data.errors).flat().join(', ');
            } else {
                setErrorMessage(err.message);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Create a New User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <ErrorMessage message={errorMessage} />
                <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', {
                            required: "Name is required",
                            minLength: { value: 3, message: "Name is too short (minimum is 3 characters)" },
                        })}
                        className="border rounded p-2 w-full"
                    />
                    <ErrorMessage message={errors.name?.message} />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Create user
                </button>
            </form>
        </div>
    );
};

export default UserNew;
