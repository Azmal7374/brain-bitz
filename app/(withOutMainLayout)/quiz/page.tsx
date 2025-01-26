/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prettier/prettier */
"use client"
import { useState } from "react";
import axios from "axios"; // For API calls
import { AxiosError } from 'axios';
import { Input } from "@heroui/input";
import { Spacer } from "@heroui/spacer";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import QRCode from "qrcode";

const Quiz: React.FC = () => {
  const [name, setName] = useState<string>(""); // Player's name
  const [roomCode, setRoomCode] = useState<string>(""); // Unique room code
  const [timer, setTimer] = useState<string>(""); // Timer duration
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]); // Selected quizzes
  const [roomLink, setRoomLink] = useState<string>(""); // Link to the created room
  const [qrCode, setQrCode] = useState<string>(""); // QR code for the room
  const [isScannerActive, setIsScannerActive] = useState<boolean>(false); // QR scanner activation state
  const [scannerError, setScannerError] = useState<string>(""); // Error for scanner
  const [fileUpload, setFileUpload] = useState<File | null>(null); // File upload for QR code image

  // Handle room creation
  const newRoomCode = Math.random().toString(36).substr(2, 6).toUpperCase();
  
  // Modify the room creation and join functionality to include the username in the URL
const handleCreateRoom = async () => {
    if (!name.trim()) {
      alert("Please enter your name before creating a room!");
      return;
    }
  
    // Generate a unique room code and QR code
    const qrCodeData = await QRCode.toDataURL(newRoomCode);
  
    try {
      // Payload for room creation API
      const roomData = {
        username: name,
        quizCategories: selectedQuizzes,
        timer: Number(timer) || 60, // Default timer value is 60 seconds if no input
        roomCode: newRoomCode,
        qrCode: qrCodeData,
      };
  
      // Call the backend API to create the room
      const response = await axios.post("http://localhost:5000/api/room/create", roomData);
  
      if (response.status === 201) {
        setRoomLink(`${window.location.origin}/room?roomId=${newRoomCode}&username=${name}`);
        setQrCode(qrCodeData);
        window.location.href = `/room?roomId=${newRoomCode}&username=${name}`;  // Pass the name in the URL
      } else {
        alert("Error creating room, please try again!");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  
  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      alert("Please enter a valid room code!");
      return;
    }
  
    try {
      // API call to join the room using roomCode and username
      const response = await axios.post("http://localhost:5000/api/room/join", { 
        roomCode,
        username: name // Send the player's name as username
      });
  
      if (response.status === 200) {
        window.location.href = `/room?roomId=${roomCode}&username=${name}`;  // Pass the name in the URL
      } else {
        alert("Room not found, please check the code and try again!");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An error occurred while joining the room.");
    }
  };
  

  // Handle QR code file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileUpload(file);
      // Further process the uploaded QR code image (e.g., scan or decode it)
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-8">
      <h2 className="text-2xl font-bold">Quiz App Home</h2>
      <div className="w-full max-w-md">
        <p className="mb-2">Name:</p>
        <Input
          placeholder="Pick a name!"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      </div>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl">
        {/* Create Room Card */}
        <Card className="p-4 w-full max-w-sm">
          <h4 className="text-lg font-semibold">Create Room</h4>
          <Spacer y={0.5} />
          <h2>Question Timer (seconds):</h2>
        
          <Input
            placeholder="Enter timer duration"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            fullWidth
          />
          <Spacer y={1} />
          <h2>Select Quizzes:</h2>
          <CheckboxGroup
            value={selectedQuizzes}
            onChange={setSelectedQuizzes}
            className="mt-4"
          >
            <Checkbox value="General Knowledge">General Knowledge</Checkbox>
            <Checkbox value="Science">Science</Checkbox>
            <Checkbox value="History">History</Checkbox>
            <Checkbox value="Geography">Geography</Checkbox>
          </CheckboxGroup>
          <Spacer y={1.5} />
          <Button color="primary" onPress={handleCreateRoom}>
            Create a Lobby
          </Button>
        </Card>

        {/* Join Room Card */}
        <Card className="p-4 w-full max-w-sm">
          <h4 className="text-lg font-semibold">Join Lobby</h4>
          <Spacer y={0.5} />
          <h2>Room Code:</h2>
          <Input
            placeholder="Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            fullWidth
          />
          <Spacer y={1.5} />
          <Button color="primary" onPress={handleJoinRoom}>
            Join a Lobby
          </Button>
          <Spacer y={1.5} />
          <div>
            <h3>Or Scan QR Code:</h3>
            <Button color="primary" onPress={() => setIsScannerActive(true)}>
              Scan QR Code
            </Button>
            {isScannerActive && (
              <div>
                <video id="qr-video" className="w-full h-auto"></video>
                {scannerError && <p className="text-red-500">{scannerError}</p>}
              </div>
            )}
          </div>
          <Spacer y={1.5} />
          <div>
            <h3>Or Upload QR Code Image:</h3>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
        </Card>

        {/* QR Code Display */}
        {qrCode && (
          <Card className="p-4 w-full max-w-sm">
            <h4 className="text-lg font-semibold">Room QR Code</h4>
            <Spacer y={0.5} />
            <img src={qrCode} alt="QR Code" className="w-32 h-32" />
            <Spacer y={1} />
            <p>Share this QR code with others to join the room!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Quiz;
