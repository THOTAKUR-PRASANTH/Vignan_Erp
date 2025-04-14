const express = require('express');
const router = express.Router();
const studentRoute = require('./studentRoutes');
const questionBankRoutes = require('./QuestionBankRoutes');


router.use('/v1/student',studentRoute);
router.use('/questionbank',questionBankRoutes);


module.exports = router;