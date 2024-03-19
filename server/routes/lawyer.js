import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import {
  getLawyer,

} from "../controllers/lawyer.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router(); // Create a new router instance
router.get("/search",  getLawyer);
/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
