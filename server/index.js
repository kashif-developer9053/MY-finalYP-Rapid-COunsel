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
// import chatRoutes from './routes/chat.js';
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
// Change the import statement in index.js
import {
  handleChatConnection,

} from "./controllers/chatController.js";
import { setIoInstance } from "./controllers/chatController.js";
import Lawyer from "./routes/lawyer.js";

/*test*/
// import User from './models/User.js';
// import Post from './models/Post.js';
// import {users,posts} from './data/index.js';
/* Configs */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
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
//routes w files
app.post("/auth/register", upload.single("picture"), register);
app.post("/auth/lawregister", upload.single("picture"), lawregister);

app.post("/posts", verifyToken, upload.single("picture"), createPost);
/*routes*/
app.use("/auth", authRouts);
app.use("/users",verifyToken, userRouts);
app.use("/posts", postRouts);
app.use('/search', searchRoutes);
app.use('/lawyers',verifyToken, Lawyer);

//mongoose


const PORT = process.env.PORT || 3001;
console.log(process.env.MONGO_URL);
mongoose.set("strictQuery", true);

setIoInstance(io);
io.on("connection", (socket) => {
    handleChatConnection(socket);
  });

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));
