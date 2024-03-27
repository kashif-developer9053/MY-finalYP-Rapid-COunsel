import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  users
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

console.log(verifyToken.value)
const router = express.Router();

/* READ */
router.get("/allusers", verifyToken, users); // Route to fetch all users

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
