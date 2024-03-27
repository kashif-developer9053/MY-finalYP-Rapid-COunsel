// controllers/chatController.js
import Chat from '../models/Chat';

export const sendMessage = async (req, res) => {
  const { sender, recipient, message } = req.body;
  try {
    const newMessage = await Chat.create({ sender, recipient, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
