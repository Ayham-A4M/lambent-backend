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
const handleGetQuiz = require('../controllers/shared/handleGetQuiz');
const handleCompleteQuiz = require('../controllers/user/handleCompleteQuiz');
const handleGetDashboard = require('../controllers/user/handleGetDashboard');
const learningTimeValidator=require('../validators/user/learningTime.validator');
const handleUpdateLearningTime = require('../controllers/user/handleUpdateLearningTime');
const handleGetBadges = require('../controllers/user/handleGetBadges');
const upload=require("../utils/imageUpload");


router.get('/courses', verifyLearner, handleGetCourses);
router.get('/courses/:courseId/lessons', verifyLearner, hasAccessToCourse, handleGetLessons);
router.get('/courses/:courseId/lessons/:lessonId', verifyLearner, hasAccessToCourse, handleGetLesson);
router.get('/courses/:courseId/lessons/:lessonId/quiz', verifyLearner, hasAccessToCourse, handleGetQuiz);
router.get('/dashboard',verifyLearner,handleGetDashboard);
router.get('/badges',verifyLearner,handleGetBadges);

router.post('/courses/:courseId/join', verifyLearner, handleJoiningCourse);
router.post('/courses/:courseId/lessons/:lessonId/quiz/:quizId/completed',verifyLearner,handleCompleteQuiz);



router.post('/learningTime',upload.none(),learningTimeValidator,verifyLearner,handleUpdateLearningTime);
router.put('/progress/:courseId', verifyLearner, handleUpdateProgress);
router.put('/streak', verifyLearner, handleUpdateStreak);


module.exports = router;