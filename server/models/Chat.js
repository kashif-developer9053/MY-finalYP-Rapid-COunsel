// models/Chat.js
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Lawyer' },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Chat', chatSchema);
