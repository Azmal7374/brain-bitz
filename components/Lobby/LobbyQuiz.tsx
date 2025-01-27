/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
"use client"
import { useSocket } from '@/utlis/SocketContext';
import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  options: string[];
}

const LobbyQuiz: React.FC = () => {
  const { socket } = useSocket();
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  useEffect(() => {
    if (socket) {
      socket.on('quiz-started', () => {
        setQuestion({
          question: 'What is the capital of France?',
          options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        });
      });

      socket.on('player-answer', (data) => {
        console.log(data); // Handle player answer submission here
      });
    }

    return () => {
      if (socket) {
        socket.off('quiz-started');
        socket.off('player-answer');
      }
    };
  }, [socket]);

  const submitAnswer = () => {
    if (socket && question) {
      socket.emit('submit-answer', {
        lobbyId: 'sample-lobby-id',
        playerId: 'player-id',
        answer: selectedAnswer,
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {question ? (
        <>
          <h2 className="mb-4">{question.question}</h2>
          {question.options.map((option, index) => (
            <button
              key={index}
              className="p-2 bg-gray-200 mb-2"
              onClick={() => setSelectedAnswer(option)}
            >
              {option}
            </button>
          ))}
          <button onClick={submitAnswer} className="p-2 bg-blue-500 text-white">
            Submit Answer
          </button>
        </>
      ) : (
        <p>Waiting for the quiz to start...</p>
      )}
    </div>
  );
};

export default LobbyQuiz;
