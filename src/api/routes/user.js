const express = require('express');
const router = express.Router();
const verifyLearner = require('../middlewares/verifyLearner');
const hasAccessToCourse = require('../middlewares/hasAccessToCourse');
const handleUpdateStreak = require('../controllers/user/handleUpdateStreak');
const handleGetCourses = require('../controllers/user/handleGetCourses');
const handleGetLessons = require('../controllers/shared/handleGetLessons');
const handleGetLesson = require('../controllers/shared/handleGetLesson');
const handleUpdateProgress = require('../controllers/user/handleUpdateProgress');
const handleJoiningCourse = require('../controllers/user/handleJoiningCourse');

router.get('/courses', verifyLearner, handleGetCourses);
router.get('/courses/:courseId/lessons', verifyLearner, hasAccessToCourse, handleGetLessons);
router.get('/courses/:courseId/lessons/:lessonId', verifyLearner, hasAccessToCourse, handleGetLesson);


router.post('/courses/:courseId/join', verifyLearner, handleJoiningCourse);





router.put('/progress/:courseId', verifyLearner, handleUpdateProgress);
router.put('/streak', verifyLearner, handleUpdateStreak);







module.exports = router;