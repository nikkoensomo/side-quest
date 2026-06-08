import express from 'express';
import { 
    getAllUsers, 
    getUserByEmail, 
    getUserByUsername,
    updateUserById,
    deleteUserById,
    getLoggedInUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/username', getUserByUsername);
router.post('/email', getUserByEmail);
router.put('/:id', updateUserById);
router.delete('/', protect, deleteUserById);
router.get('/logged-user', protect, getLoggedInUser);

export default router;