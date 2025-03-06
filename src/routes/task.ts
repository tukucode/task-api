import { Router } from 'express';
import { newTask, listTask, detailTask, completedTask, deleteTask } from '../controllers/taks'

const router = Router();

router.post('/task/new',  newTask);
router.get('/task', listTask);
router.get('/task/:id', detailTask);
router.put('/task/:id', completedTask);
router.delete('/task/:id', deleteTask);

export default router;