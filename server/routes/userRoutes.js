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
router.post('/', getUserByUsername);
router.post('/', getUserByEmail);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.get('/', protect, getLoggedInUser);

export default router;