import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const clientSocket = io("http://localhost:5000"); // Your server URL

interface ChatProps {
  userName: string;
  roomId: string;
}

const Chat: React.FC<ChatProps> = ({ userName, roomId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ user: string; text: string; time: string }[]>([]);
  const [userJoinTime, setUserJoinTime] = useState<string>("");

  // To handle joining the room and receiving messages
  useEffect(() => {
    if (!userName || !roomId) return; // Ensure userName and roomId are not empty

    const currentTime = new Date().toLocaleTimeString();
    setUserJoinTime(currentTime);

    // Emit user join event with the username and room code
    clientSocket.emit("joinRoom", { userName, roomCode: roomId });

    // Listen for user join and left events
    clientSocket.on("userJoined", ({ userName, action }) => {
      const message = `${userName} ${action} the room.`;
      setMessages((prev) => [...prev, { user: "System", text: message, time: currentTime }]);
    });

    clientSocket.on("userLeft", ({ userName, action }) => {
      const message = `${userName} ${action} the room.`;
      setMessages((prev) => [...prev, { user: "System", text: message, time: currentTime }]);
    });

    // Listen for new messages (but only display those from others)
    clientSocket.on("newMessage", (msg) => {
      if (msg.user !== userName) { // Avoid showing the user's own message in the message list
        setMessages((prev) => [...prev, { ...msg, time: currentTime }]);
      }
    });

    // Cleanup when the component unmounts
    return () => {
      clientSocket.emit("leaveRoom", { roomCode: roomId, userName });
      clientSocket.off("userJoined");
      clientSocket.off("userLeft");
      clientSocket.off("newMessage");
    };
  }, [roomId, userName]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const currentTime = new Date().toLocaleTimeString();
    const newMessage = { user: userName, text: message, roomId, time: currentTime };

    // Emit the message to the server
    clientSocket.emit("chatMessage", newMessage);

    // Update the local state to display the message (but avoid duplication)
    setMessages((prev) => [...prev, newMessage]);
    setMessage(""); // Clear the input field
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
        {userJoinTime && (
          <p>
            <strong style={{ color: "green" }}>
              {userName} joined the room at {userJoinTime}
            </strong>
          </p>
        )}
        {messages.map((msg, index) => (
          <p key={index} style={{ color: msg.user === userName ? "blue" : "black", fontWeight: msg.user === userName ? "bold" : "normal" }}>
            <strong>{msg.user}</strong>: {msg.text} <span style={{ fontSize: "0.8rem", color: "gray" }}>({msg.time})</span>
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown} // Handle Enter key press
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "10px" }}>Send</button>
    </div>
  );
};

export default Chat;
