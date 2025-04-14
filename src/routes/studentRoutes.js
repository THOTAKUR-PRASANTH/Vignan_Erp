const express = require("express");
const router = express.Router();

const {verifyjwt} = require('../middleware/authorizationFilter');
const StudentHandlers = require('../handlers/studentHandlers');
const handler = new StudentHandlers();


router.post('/studentRegistration', [handler.studentRegistration]);
router.post('/login', [handler.loginUser]);
router.get('/refreshToken', [handler.refreshToken]);

//verifyjwt should be there for all APIs which are accessed after the login to maintain the user session.
//router.post('/updateStudenteducationalData',verifyjwt, [handler.studentRegistration]);

module.exports = router;