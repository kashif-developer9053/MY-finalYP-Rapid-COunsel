import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import http from "http";
import authRouts from "./routes/auth.js";
import searchRoutes from './routes/Search.js';
import userRouts from "./routes/users.js";
import { register ,lawregister } from "./controllers/auth.js";
import postRouts from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { handleChatConnection } from "./controllers/chatController.js";
import { setIoInstance } from "./controllers/chatController.js";
import Lawyer from "./routes/lawyer.js";
import Chat from './models/Chat.js'; // Import the Chat model

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);
setIoInstance(io); // Set the socket.io instance

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// CORS configuration
// CORS configuration
app.use(cors());



app.use("/assets", express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/auth/lawregister", upload.single("picture"), lawregister);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRouts);
app.use("/users", verifyToken, userRouts);
app.use("/posts", postRouts);
app.use('/search', searchRoutes);
app.use('/lawyers', verifyToken, Lawyer);

const PORT = process.env.PORT || 3001;

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // Handle sending messages
  socket.on('sendMessage', async (data) => {
    try {
      const { sender, recipient, message } = data;
      const newMessage = await Chat.create({ sender, recipient, message });
      io.emit('message', newMessage); // Broadcast the new message to all connected clients
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });
});
