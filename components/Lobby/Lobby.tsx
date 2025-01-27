/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
"use client"
import { useSocket } from '@/utlis/SocketContext';
import React, { useState } from 'react';

const Lobby: React.FC = () => {
  const { socket } = useSocket();
  const [lobbyId, setLobbyId] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [team, setTeam] = useState<'red' | 'blue' | 'green' | 'yellow'>('red');
  const [message, setMessage] = useState<string>('');

  const joinLobby = () => {
    if (socket) {
      socket.emit('join-lobby', lobbyId);
      setMessage(`Joined lobby ${lobbyId} as player ${playerId}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Lobby ID"
        value={lobbyId}
        onChange={(e) => setLobbyId(e.target.value)}
        className="mb-2 p-2 border border-gray-300"
      />
      <input
        type="text"
        placeholder="Player ID"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        className="mb-2 p-2 border border-gray-300"
      />
      <select value={team} onChange={(e) => setTeam(e.target.value as 'red' | 'blue' | 'green' | 'yellow')} className="mb-2 p-2">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
      </select>
      <button onClick={joinLobby} className="p-2 bg-blue-500 text-white">
        Join Lobby
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Lobby;
