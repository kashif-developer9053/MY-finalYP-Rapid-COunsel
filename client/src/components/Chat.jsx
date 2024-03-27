// Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from "react-redux";

const socket = io('http://localhost:3001'); // Adjust URL as needed

const Chat = ({ recipient }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { _id } = useSelector((state) => state.user);
  const userId = _id;
  useEffect(() => {
    socket.on('message', (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', {
        sender: userId,
        recipient: recipient._id,
        message: message
      });
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender}: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
