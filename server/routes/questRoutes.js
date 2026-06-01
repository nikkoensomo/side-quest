import express from 'express';
import { 
    createQuest, 
    displayUserQuest,
    displayAllQuests,
    displayUserTakenQuests,
    displayUserCompletedQuests,
    displayUserCancelledQuests,
    acceptQuest,
    completeQuest,
    updateUserQuest,
    cancelAcceptedQuest,
    deleteUserQuest
} from '../controllers/questController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createQuest);
router.get('/', protect, displayAllQuests);
router.get('/my-quests', protect, displayUserQuest);
router.get('/taken', protect, displayUserTakenQuests);
router.get('/completed', protect, displayUserCompletedQuests);
router.get('/cancelled', protect, displayUserCancelledQuests);
router.put('/accept/:id', protect, acceptQuest);
router.put('/complete/:id', protect, completeQuest);
router.put('/:id', protect, updateUserQuest);
router.put('/cancel/:id', protect, cancelAcceptedQuest);
router.delete('/:id', protect, deleteUserQuest);

export default router;