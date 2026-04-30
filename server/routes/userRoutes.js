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

router.get('/get-all-users', getAllUsers);
router.post('/get-by-username', getUserByUsername);
router.post('/get-by-email', getUserByEmail);
router.put('/update-by-id/:id', updateUserById);
router.delete('/delete-by-id/:id', deleteUserById);
router.get('/get-logged-user', protect, getLoggedInUser);

export default router;