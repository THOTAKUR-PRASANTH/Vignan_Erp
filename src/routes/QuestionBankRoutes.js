const express = require('express');
const router = express.Router();    
const {QuestionBankHandler,upload } = require("../handlers/questionBankHandler"); 
const handler = new QuestionBankHandler();


router.post("/uploadQuestionBank", upload.single("file"), handler.uplodeHandler);
router.post("/create-empty-question-bank", handler.createEmptyQuestionBankHandler);

module.exports = router;

