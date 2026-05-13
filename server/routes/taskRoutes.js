import express from 'express';
import { 
    createTask, 
    displayUserTasks, 
    updateUserTasks,
    deleteUserTask
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, displayUserTasks);
router.put('/:id', protect, updateUserTasks);
router.delete('/:id', protect, deleteUserTask);

export default router;