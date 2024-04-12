import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authRoutes.js'
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { checkLoggedIn } from '../middlewares/checkLoggedIn.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', checkLoggedIn, loginUser);
router.post('/logout', logoutUser);

export default router;