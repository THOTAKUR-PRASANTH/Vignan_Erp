const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage }); 
const QuestionBankService = require("../services/questionBankService");
const xlsx = require("xlsx");


class QuestionBankHandler{

    constructor() {
        this.questionBankService = new QuestionBankService();
    }

    // uplodes or create the new question bank
    uplodeHandler = async (req, res) => {
        console.log("QuestionBankHandler - Start of uplodeHandler")
        try 
        {
            if (!req.file) {
                return res.status(400).send(
                    {
                        status: "Failure",
                        message: "No file uploaded",
                        code: "400",
                    });
            }   
    
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        if (sheetData.length === 0) {
            return res.status(400).send(
                {
                    status: "Failure",
                    message: "No data found in the uploaded file",
                    code: "400",
                });
        }
        let result = await this.questionBankService.createQuestionBank(sheetData,"tprashanth312@gmail.com");
        if (!result || !result._id) {
            return res.status(500).json({
            status: 'failure',
            message: 'Failed to create question bank.',
            });
        }
        res.status(201).json({
            status: 'success',
            message: 'Question bank created successfully.',
            data: result,
        });
        console.log("QuestionBankHandler - End of uplodeHandler");  
        }
        catch (error) {
        
        return res.status(500).send(
                {
                    status: "Failure",
                    message: error.message ? error.message : "Internal Server Issue. Please try after sometime."
                }
            );
        }
    }


    // create the  empty new question bank
    createEmptyQuestionBankHandler = async (req, res) => {
        try {
            const {name} = req.body;
            if(name == null || name == ""){
                return res.status(400).send(
                    {
                        status: "Failure",
                        message: "Please provide the question bank name",
                        code: "400",
                    });
            }
        const questionBankName = name || `QuestionBank_${Date.now()}`;
        let result =await this.questionBankService.createEmptyQuestionBankService(questionBankName);
        if (!result || !result._id) {
            return res.status(500).json({
            status: 'failure',
            message: 'Failed to create question bank.',
            });
        }
        res.status(201).json({
            status: 'success',
            message: 'Empty Question bank created successfully.',
            data: result,
        });
        }
        catch(error){
            console.error("QuestionBankHandler - createEmptyQuestionBankHandler || Error : ", error.message);
            return res.status(500).send(
                {
                    status: "Failure",
                    message: error.message ? error.message : "Internal Server Issue. Please try after sometime."
                }
            );
        }
    }

    // add question to the question bank
    addQuestionToQuestionBank = async (req, res) => {
        try {

            if (!req.file) {
                return res.status(400).send(
                    {
                        status: "Failure",
                        message: "No file uploaded",
                        code: "400",
                    });
            }  
            else{
                console.log("File details:", req.file);
               

            }
            const { id: questionBankId } = req.params; 
            const userEmail =  "tprashanth312@gmail.com"; 


            console.log("Here is the form data:", req.body);
            console.log("Uploaded file info:", req.file);


            const result = await this.questionBankService.addQuestionToBank(
                questionBankId,
                req.body,  
                req.files, 
                userEmail  
            );
            return res.status(201).json({
                message: "Question added successfully.",
                questionBank: result,  
            });
        } catch (error) {
            console.error("Error adding question:", error);
            return res.status(500).json({ error: "Server error while adding question." });
        }
    }

// get all the question banks
getQuestionBanks = async (req, res) => {
    console.log("QuestionBankHandler - Start of getQuestionBanks")
    const questionBank = await this.questionBankService.getQuestionBanks();
    if (!questionBank) {
        return res.status(404).json({
            status: 'failure',
            message: 'No question banks found.',
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'Question banks retrieved successfully.',
        data: questionBank,
    });
}
 
// get questionbankWithQuestionsById
questionBankWithQuestionsById = async (req, res) => {
    console.log("QuestionBankHandler - Start of questionBankWithQuestionsById")
    const { id } = req.params;
    const questionBankWithQuestions = await this.questionBankService.questionBankWithQuestions(id);
    if (!questionBankWithQuestions) {
        return res.status(404).json({
            status: 'failure',
            message: 'No questionbank found under given id',
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'QuestionbankWithQuestions retrieved successfully.',
        data: questionBankWithQuestions,
    });
}
 







}
module.exports = {QuestionBankHandler,upload };

