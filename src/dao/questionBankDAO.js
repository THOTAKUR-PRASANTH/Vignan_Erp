const QuestionBankModel = require('../models/QuestionBankModel.js');

class QuestionBankDao{

    create = async (questionBank)=>{
            try {
                console.log("QuestionBankDao - Inside of create");
                const persistanceData = await questionBank.save();
                console.log("QuestionBankDao - End of create") 
                return persistanceData;
            } catch (error) {
                console.error("QuestionBank - create ||  Error : ", error.message);
                throw error;
            }
        }

}

module.exports = QuestionBankDao;