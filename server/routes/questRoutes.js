import express from 'express';
import { 
    createQuest, 
    displayUserQuest, 
    updateUserQuest,
    deleteUserQuest
} from '../controllers/questController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createQuest);
router.get('/', protect, displayUserQuest);
router.put('/:id', protect, updateUserQuest);
router.delete('/:id', protect, deleteUserQuest);

export default router;