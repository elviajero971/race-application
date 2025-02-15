// src/components/ParticipantItem.jsx
import React from 'react';
import { LaneIcon, MedalIcon } from './Icons';

const ParticipantItem = ({ participant }) => (
    <li className="flex border p-3 rounded shadow-sm bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
            <p className="font-medium">{participant.user.name}</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
            <LaneIcon />
            <span>{participant.lane}</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
            <MedalIcon />
            <span>{participant.position ? participant.position : 'N/A'}</span>
        </div>
    </li>
);

export default ParticipantItem;
