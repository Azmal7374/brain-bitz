/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import Lobby from '@/components/Lobby/Lobby';
import LobbyQuiz from '@/components/Lobby/LobbyQuiz';
import React from 'react';

const page = () => {
    return (
        <div className="p-4">
        <Lobby />
        <LobbyQuiz />
      </div>
    );
};

export default page;