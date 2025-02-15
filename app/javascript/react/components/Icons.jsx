import React from 'react';
import { FaEye, FaTrash, FaEdit, FaUser, FaRoad, FaMedal } from 'react-icons/fa';

export const ViewDetailsIcon = () => (
    <FaEye className="text-blue-500 hover:text-blue-700 transition-colors duration-200 transform hover:scale-110" size={20} />
);

export const DeleteIcon = () => (
    <FaTrash className="text-red-500 hover:text-red-700 transition-colors duration-200 transform hover:scale-110" size={20} />
);

export const UpdateIcon = () => (
    <FaEdit className="text-blue-500 hover:text-blue-700 transition-colors duration-200 transform hover:scale-110" size={20} />
);

export const UserIcon = () => (
    <FaUser className="text-blue-500" size={20} />
);

export const LaneIcon = () => (
    <FaRoad className="mr-1 text-green-500
" size={20} />
);

export const MedalIcon = () => (
    <FaMedal className="mr-1 text-yellow-500
" size={20} />
);
