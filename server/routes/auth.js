import express from 'express';

import { login,register,lawregister,lawlogin } from "../controllers/auth.js";

const router = express.Router();


router.post("/login",login);
router.post("/register",register);
router.post("/lawregister",lawregister);
router.post("/lawlogin",lawlogin);





export default router;
