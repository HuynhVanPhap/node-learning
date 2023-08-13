import express from 'express';
import CourseController from '../app/controllers/CourseController.js';

const courseController = new CourseController();

const router = express.Router();

router.get('/create', courseController.create)
router.post('/store', courseController.store)
router.get('/edit/:slug', courseController.edit)
router.put('/update/:id', courseController.update)
router.delete('/delete', courseController.deleteMultiple)
router.delete('/delete/:id', courseController.delete)
router.delete('/destroy/:id', courseController.destroy)
router.patch('/restore/:id', courseController.restore)
router.get('/:slug', courseController.detail)
router.get('/', courseController.index);

export default router;