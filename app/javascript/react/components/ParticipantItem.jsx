import React from 'react';
import { FaRoad, FaMedal } from 'react-icons/fa';

const ParticipantItem = ({ participant }) => (
    <li className="flex border p-3 rounded shadow-sm bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
            <p className="font-medium">{participant.user.name}</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
            <FaRoad className="mr-1 text-green-500" />
            <span>{participant.lane}</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
            <FaMedal className="mr-1 text-yellow-500" />
            <span>{participant.position ? participant.position : 'N/A'}</span>
        </div>
    </li>
);

export default ParticipantItem;
