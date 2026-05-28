import express from 'express';
import { 
    createQuest, 
    displayUserQuest,
    displayAllQuests,
    displayUserTakenQuests,
    acceptQuest,
    completedQuest,
    updateUserQuest,
    deleteUserQuest
} from '../controllers/questController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createQuest);
router.get('/', protect, displayAllQuests);
router.get('/my-quests', protect, displayUserQuest);
router.get('/taken', protect, displayUserTakenQuests);
router.put('/accept/:id', protect, acceptQuest);
router.put('/complete/:id', protect, completedQuest);
router.put('/:id', protect, updateUserQuest);
router.delete('/:id', protect, deleteUserQuest);

export default router;