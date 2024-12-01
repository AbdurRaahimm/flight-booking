import express from 'express';
import { authVerify } from '../middleware/authVerify.js';
import { login, register, userUpdate } from '../controllers/AuthController.js';



const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/user-update", authVerify, userUpdate)

export default router

