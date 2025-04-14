var StudentModel = require("../models/StudentModel");


class StudentDao { 

	create = async (studentData)=>{
        try {
            console.log("StudentDao - Inside of create") 
            const student = new StudentModel({  ...studentData });
            const persistanceData = await student.save();
            console.log("StudentDao - End of create") 
            return persistanceData;
        } catch (error) {
            console.error("StudentDao - create ||  Error : ", error.message);
            throw error;
        }
    }

    getDataByAggregateFilters = async (filters) => {
        try {
            console.log("StudentDao - Inside of getDataByFilters") 
            const documentsData = await StudentModel.aggregate([{$match:filters}])
            console.log("StudentDao - Inside of getDataByFilters") 
            return documentsData;
        } catch (error) {
            console.log("StudentDao - getDataByFilters || Error : ", error);
            throw error;
        }
    }

    getDataByFilters = async (filters) => {
        try {
            console.log("StudentDao - Inside of getDataByFilters") 
            const documentsData = await StudentModel.find(filters);
            console.log("StudentDao - Inside of getDataByFilters") 
            return documentsData;
        } catch (error) {
            console.log("StudentDao - getDataByFilters || Error : ", error);
            throw error;
        }
    }

    getOneDataByFilters = async (filters) => {
        try {
            console.log("StudentDao - Inside of getOneDataByFilters");
            const documentsData = await StudentModel.findOne(filters);
            console.log("StudentDao - Inside of getOneDataByFilters");
            return documentsData;
        } catch (error) {
            console.log("StudentDao - getOneDataByFilters || Error : ", error);
            throw error;
        }
    }




};
module.exports = StudentDao;