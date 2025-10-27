const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin');
const handleCreateInstructor = require('../controllers/admin/handleCreateInstructor');
const upload = require('../utils/imageUpload');
const handleGetInstructors = require('../controllers/admin/handleGetInstructors');
const handleDeleteInstructor = require('../controllers/admin/handleDeleteInstructor');
const handleGetInstructorById = require('../controllers/admin/handleGetInstructorById');
const handleUpdateInstructor=require('../controllers/admin/handleUpdateInstructor')
const instructorValidator = require('../validators/admin/instrucor.validator')
const edittInstructorValidator = require('../validators/admin/editInstructor.validator')


router.get('/instructors', verifyAdmin, handleGetInstructors);

router.get('/instructor/:id', verifyAdmin, handleGetInstructorById);
router.post('/instructor', verifyAdmin, upload.single("image"), instructorValidator, handleCreateInstructor);

router.put('/instructor/:id', verifyAdmin, upload.single("image"), edittInstructorValidator, handleUpdateInstructor);

router.delete('/instructor/:id', verifyAdmin, handleDeleteInstructor);

module.exports = router;