import express from 'express';
import UserController from '../app/controllers/UserController.js';

const userController = new UserController();

const router = express.Router();

router.get('/stored/courses', userController.courses)
router.get('/trash/courses', userController.trash)
router.get('/', userController.index);

export default router;