const QuestionBankDao = require('../dao/questionBankDAO.js');
const QuestionDao = require('../dao/questionDAO.js');
const QuestionLogsDao = require('../dao/QuestionLogDAO.js'); 
const Questionlogs = require('../models/QuestionLogsModel.js');
const Question = require('../models/QuestionModel.js');
const QuestionBank = require('../models/QuestionBankModel.js');

class QuestionBankService{

    constructor() { 
        this.questionBankDao = new QuestionBankDao();
        this.questionDao = new QuestionDao();
        this.questionLogsDao = new QuestionLogsDao();
    }

    // uplodes or create the new question bank
    createQuestionBank = async (requestData,userEmail) => {
    console.log("QuestionBankService - Start of createQuestionBank");

try{

    const questionBank = new QuestionBank({ name: `QuestionBank_${Date.now()}`, questions: [] });
    for (const row of requestData) {
        const newQuestion = new Question({
          examtype: row.examtype,
          quesubject: row.quesubject,
          queunit: row.queunit,
          que_type: row.que_type,
          que_level: row.que_level,
          qno: row.qno,
          questiondesc: row.questiondesc,
          option1: row.option1,
          option2: row.option2,
          option3: row.option3,
          option4: row.option4,
          answer: row.answer,
          qtimesec: row.qtimesec,
          qmarks: row.qmarks,
          queyear: row.queyear,
        });
        const savedQuestion = await this.questionDao.create(newQuestion);
        await  this.questionLogsDao.create(
            new Questionlogs({
            questionId: savedQuestion._id,
            userEmail: userEmail||null, 
            action: "CREATE_QUESTION"
          })
        );

    questionBank.questions.push(savedQuestion._id);
}
    let savedQuestionBank = await this.questionBankDao.create(questionBank); 
    console.log("QuestionBankService - End of createQuestionBank");
    return savedQuestionBank;
}
catch(error){
    console.error("QuestionBankService - createQuestionBank || Error : ", error.message);
    throw error;
}
}  


// create the  empty new question bank
createEmptyQuestionBankService = async (questionBankName) => {
   try{
    const newQuestionBank = new QuestionBank({
        name: questionBankName,
        questions: [],
      });
       return await this.questionBankDao.create(newQuestionBank);
   }   
   catch(error){
    console.error("QuestionBankService - createEmptyQuestionBankHandler || Error : ", error.message);
    throw error;
   }
}




//add the questions to the Existing  question bank  pavan nu nuvu chey edi.....  







}
module.exports = QuestionBankService;
