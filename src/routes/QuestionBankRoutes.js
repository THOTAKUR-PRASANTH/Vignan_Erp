const express = require('express');
const router = express.Router();    
const {QuestionBankHandler,upload } = require("../handlers/questionBankHandler"); 
const handler = new QuestionBankHandler();


router.post("/uploadQuestionBank",upload.single("file"), handler.uplodeHandler);
router.post("/create-empty-question-bank", handler.createEmptyQuestionBankHandler);
router.post("/questionbank-addquestion/:id", upload.any("file"),handler.addQuestionToQuestionBank);
router.get("/getQuestionbanks", handler.getQuestionBanks);
router.get("/getQuestionBankWithQuestionsById/:id", handler.questionBankWithQuestionsById);    

module.exports = router;

