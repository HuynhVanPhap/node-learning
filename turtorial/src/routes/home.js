import express from 'express';
import HomeController from '../app/controllers/HomeController.js';

const homeController = new HomeController();

const router = express.Router();

router.get('/', homeController.index);

export default router;