const express = require('express');
const router = express.Router();
const verifyInstructor = require('../middlewares/verifyInstructor');
const hasAccessToCourse = require('../middlewares/hasAccessToCourse');
const upload = require('../utils/imageUpload');
const handleCreateCourse = require('../controllers/instructor/handleCreateCourse');
const courseValidator = require('../validators/instructor/course.validator');
const handleGetCourses = require('../controllers/instructor/handleGetCourses');
const handleUpdateCourse = require('../controllers/instructor/handleUpdateCourse');
const lessonValidator = require('../validators/instructor/lesson.validator');
const handleCreateLesson = require('../controllers/instructor/handleCreateLesson');
const handleGetLessons = require('../controllers/shared/handleGetLessons');
const handleGetLesson = require('../controllers/shared/handleGetLesson');
const handleUpdateLesson = require('../controllers/instructor/handleUpdateLesson');
const handleUpdatingQuiz = require('../controllers/instructor/quiz/handleUpdateQuiz');
const questionsValidator = require('../validators/instructor/questions.validator');
const handleGetQuiz = require('../controllers/shared/handleGetQuiz');
const questionValidator = require('../validators/instructor/questionValidator');
const handleUpdateQuestion = require('../controllers/instructor/quiz/handleUpdateQuestion');
const handleDeleteQuestion = require('../controllers/instructor/quiz/handleDeleteQuestion');
// const handleCreateNewPage = require('../controllers/instructor/handleCreateNewPage');

router.get('/course', verifyInstructor, handleGetCourses);
router.get('/courses/:courseId/lessons', verifyInstructor, hasAccessToCourse, hasAccessToCourse, handleGetLessons);
router.get('/courses/:courseId/lessons/:lessonId', verifyInstructor, hasAccessToCourse, handleGetLesson);
router.get('/courses/:courseId/lessons/:lessonId/quiz', verifyInstructor, hasAccessToCourse, handleGetQuiz)

router.post('/course', verifyInstructor, upload.single('image'), courseValidator, handleCreateCourse);
router.post('/course/:courseId/lesson', verifyInstructor, lessonValidator, hasAccessToCourse, handleCreateLesson);

router.put('/courses/:courseId/lessons/:lessonId', verifyInstructor, hasAccessToCourse, handleUpdateLesson);
router.put('/course/:courseId', verifyInstructor, upload.single('image'), courseValidator, hasAccessToCourse, handleUpdateCourse);
router.put('/courses/:courseId/lessons/:lessonId/quiz', verifyInstructor, questionsValidator, hasAccessToCourse, handleUpdatingQuiz);
router.put('/courses/:courseId/lessons/:lessonId/quiz/:questionId', verifyInstructor, questionValidator, hasAccessToCourse, handleUpdateQuestion);

router.delete('/courses/:courseId/lessons/:lessonId/quiz/:questionId', verifyInstructor, hasAccessToCourse, handleDeleteQuestion);
// router.post('/course/:courseId/lesson/:lessonId/new-page', verifyInstructor,handleCreateNewPage); // this is for create a page 

module.exports = router;
