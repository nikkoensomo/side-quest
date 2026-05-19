import express from 'express';
import { 
    createQuest, 
    displayUserQuest,
    displayAllQuests,
    acceptQuest,
    updateUserQuest,
    deleteUserQuest
} from '../controllers/questController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createQuest);
router.get('/', protect, displayAllQuests);
router.get('/my-quests', protect, displayUserQuest);
router.put('/accept/:id', protect, acceptQuest);
router.put('/:id', protect, updateUserQuest);
router.delete('/:id', protect, deleteUserQuest);

export default router;