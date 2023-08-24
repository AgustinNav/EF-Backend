import { Router } from 'express';
//import del service repository:
import { getAll, createStudent } from '../controllers/students.controller.js';
import { addLogger } from '../config/logger.js';


const router = Router();

router.get('/', addLogger, getAll);

router.post('/', addLogger, createStudent);

export default router;