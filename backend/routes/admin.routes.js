import express from 'express';
// import authRouter from './auth.routes.js';
import careerRouter from './career.routes.js';
import courseRouter from './course.routes.js';
import eventRouter from './event.routes.js';
import forumRouter from './forum.routes.js';
import galleryRouter from './gallery.routes.js';
import alumniRouter from './alumni.routes.js';
import settingsRouter from './settings.routes.js';
import userRouter from './user.routes.js';
import dashboardRouter from './dashboard.routes.js'

const router = express.Router();

router.use('/dashboard', dashboardRouter);
router.use('/users', userRouter);

router.use('/jobs', careerRouter);
router.use('/courses', courseRouter);
router.use('/events', eventRouter);
router.use('/forums', forumRouter);
router.use('/gallery', galleryRouter);
router.use('/alumni', alumniRouter);
router.use('/settings', settingsRouter);

export default router;
