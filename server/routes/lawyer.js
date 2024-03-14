import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.get('/top', async (req, res) => {
  try {
    const topLawyers = await Lawyer.find().limit(10); // Fetch top 10 lawyers
    res.json(topLawyers);
  } catch (error) {
    console.error('Error fetching top lawyers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
