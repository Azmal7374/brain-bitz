/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Chat from "@/components/Room/Chat";
import { Button } from "@heroui/button";
import QRCode from "react-qr-code";
import Link from "next/link";

const RoomPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState<string>("");
  const roomId = searchParams.get("roomId");
  const [room, setRoom] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizEnded, setQuizEnded] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [answerSelected, setAnswerSelected] = useState<boolean>(false); // New state

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("username");

    if (user) {
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    if (roomId) {
      axios
        .get(`http://localhost:5000/api/room/${roomId}`)
        .then((response) => {
          setRoom(response.data);
          setLoading(false);
          setTimeLeft(response.data.timer || 0);
          setCurrentUser(response.data.currentUser || "Unknown User");
        })
        .catch((err) => {
          setError("Failed to load room data.");
          setLoading(false);
        });
    }
  }, [roomId]);

  useEffect(() => {
    if (quizStarted && room?.questions) {
      setTimeLeft(room.timer || room.questions[currentQuestionIndex]?.timeLimit);
      startTimer(room.timer || room.questions[currentQuestionIndex]?.timeLimit);
    }
  }, [quizStarted, room, currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft === 0 && quizStarted && !quizEnded) {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const startTimer = (time: number) => {
    if (intervalId) clearInterval(intervalId);
    setTimeLeft(time);
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  const handleStartQuiz = () => {
    if (!quizStarted) {
      setQuizStarted(true);
      setQuizEnded(false);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setCorrectAnswersCount(0);
      setAnswerSelected(false); // Reset answer selection when quiz starts
      startTimer(room?.timer || room.questions[currentQuestionIndex]?.timeLimit);
    }
  };

  const handleAnswerQuestion = (answer: string) => {
    const correctAnswer = room?.questions[currentQuestionIndex]?.correctAnswer;
    setUserAnswers((prev) => [
      ...prev,
      { questionIndex: currentQuestionIndex, answer, correct: answer === correctAnswer },
    ]);
    if (answer === correctAnswer) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }
    setAnswerSelected(true); // Enable "Lock In" after selecting an answer
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < room?.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerSelected(false); // Reset "Lock In" state for the next question
      startTimer(room?.questions[currentQuestionIndex + 1]?.timeLimit);
    } else {
      setQuizEnded(true);
      if (intervalId) clearInterval(intervalId);
    }
  };

  const handleResetQuiz = () => {
    setQuizStarted(false);
    setQuizEnded(false);
    setCurrentQuestionIndex(0);
    setTimeLeft(room?.timer || 0);
    setUserAnswers([]);
    setCorrectAnswersCount(0);
    setAnswerSelected(false); // Reset the answer selected state
    if (intervalId) clearInterval(intervalId);

    // Automatically start the quiz after resetting
    setQuizStarted(true);
    setTimeLeft(room?.timer || room.questions[currentQuestionIndex]?.timeLimit);
    startTimer(room?.timer || room.questions[currentQuestionIndex]?.timeLimit);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading room data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start gap-6 flex-wrap mb-6">
        <div>
          <Link href="/">
          <h1 className="text-3xl font-semibold text-gray-800">Quiz Room: {roomId}</h1>
          </Link>
          <h2 className="text-xl font-semibold text-gray-600">Welcome, {username || "Player"}!</h2>
        </div>
        <div className="flex flex-col items-center">
          <QRCode value={`http://localhost:3000/room?roomId=${roomId}`} size={120} />
          <p className="text-sm mt-2 text-gray-500">Scan to Join</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Current Users:</h3>
          <ul className="list-disc ml-6 space-y-1">
            {room?.users.map((user: any, index: number) => (
              <li key={index} className="text-sm text-gray-700">{user.username}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full bg-white rounded-lg p-6 border-2 h-[450px] md:h-[420px]">
        {!quizStarted && (
          <div className="mt-6">
            <Button
              onClick={handleStartQuiz}
              className="w-40 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Start Quiz
            </Button>
          </div>
        )}

        {quizStarted && !quizEnded && room?.questions && room.questions.length > 0 && (
          <div>
            <p className="mt-2 text-center text-lg font-medium">Time Left: {timeLeft} s</p>
            <h3 className="text-lg font-semibold mt-4">
              Question {currentQuestionIndex + 1}: {room.questions[currentQuestionIndex]?.question}
            </h3>
            <div className="mt-4 grid gap-4">
              {room.questions[currentQuestionIndex]?.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
                  onClick={() => handleAnswerQuestion(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button
                onClick={() => handleNextQuestion()}
                disabled={!answerSelected} // Disable "Lock In" until an answer is selected
                className={`w-40 py-2 ${
                  answerSelected ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                } text-white rounded-lg transition duration-300`}
              >
                Lock In
              </Button>
            </div>
          </div>
        )}

        {quizEnded && (
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-medium text-green-600 text-center">
              Quiz Ended!
            </h3>
            <h3 className="text-xl md:text-2xl font-medium text-green-600 text-center">
              Correct Answers: {correctAnswersCount}
            </h3>
            <Button
              onClick={handleResetQuiz}
              className="w-40 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Reset Room
            </Button>
          </div>
        )}
      </div>

      <div className="mt-12">
        <Chat userName={username} roomId={roomId as string} />
      </div>
    </div>
  );
};

export default RoomPage;
