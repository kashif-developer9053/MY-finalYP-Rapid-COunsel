// LawyerCard.js
import React, { useState } from 'react';
import axios from 'axios';
import Chat from '../../components/Chat'; // Import the chat component
import './style.css';
import { useSelector } from "react-redux";

const LawyerCard = ({ lawyer }) => {
  const [showChat, setShowChat] = useState(false);
  const { _id } = useSelector((state) => state.user);
  const userId = _id;


  const openChat = async () => {
    try {
      const response = await axios.post('/chat/send', {
        sender:  userId,
        recipient: lawyer._id,   
        message: 'Hi, I would like to discuss...'
      });
      
      
      setShowChat(true);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <figure className="snip1336">
        <img src={lawyer.picturePath} alt={lawyer.firstName} />
        <figcaption>
          <img src={lawyer.picturePath} alt={lawyer.firstName} className="profile" />
          <h2>{`${lawyer.firstName} ${lawyer.lastName}`}<span>{lawyer.occupation}</span></h2>
          <p>{lawyer.email}</p>
          <button className="follow">Learn More</button>
          <button className="info" onClick={openChat}>Contact</button>
        </figcaption>
      </figure>
      {showChat && <Chat recipient={lawyer} />}
    </div>
  );
}

export default LawyerCard;
