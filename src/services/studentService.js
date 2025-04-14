const StudentDAO = require("../dao/studentDAO");
const UserDAO = require("../dao/userDAO");
const RoleDAO = require("../dao/roleDAO");
const CryptoJs = require('crypto-js');
const ObjectId = require('mongodb').ObjectId;

class StudentService {

    constructor(){
        this.studentDAO = new StudentDAO();
        this.userDAO = new UserDAO();
        this.roleDAO = new RoleDAO();
    }

    studentRegistration = async (requestData) => {
        try {
            console.log("StudentService - Insdie of studentRegistration");
            let resultList = await this.studentDAO.getOneDataByFilters({"email":requestData.email});
            if(resultList && resultList.length>0){
                console.log("StudentService - End of studentRegistration");
                throw new Error("User already exists");
            }
            
            let studentResponse = await this.studentDAO.create(requestData);
            const encryptedPassword = CryptoJs.MD5("Vignan@123").toString().toUpperCase();
            let userData = {
                roleId: new ObjectId("67e40ce05396d91ddfedeb45"),
                firstName: requestData.firstName,
                lastName: requestData.lastName,
                displayName: requestData.firstName+" "+requestData.lastName, 
                profilePic: "", 
                email: requestData.email, 
                password: encryptedPassword, 
                mobile: requestData.mobile,
                createdBy: studentResponse._id
            }
            let userResponse = await this.userDAO.create(userData);
            
            console.log("StudentService - End of studentRegistration");
            if(studentResponse && userResponse)
                return studentResponse
            else{
                throw new Error("Internal Server Error. Please try again.");
            }
        } catch (error) {
            console.error("StudentService - End of studentRegistration || Error :", error);
            throw error;
        }
    }

    loginUser = async (requestData) => {
        console.log("StudentService - Insdie of loginUser");
        try {
            const encryptedPassword = CryptoJs.MD5(requestData.password).toString().toUpperCase();
            let userDataResponseList = await this.userDAO.getDataByFilters({"email":requestData.email, password:encryptedPassword});
            if(!userDataResponseList || userDataResponseList.length == 0) {
                console.log("StudentService - End of loginUser");
                throw new Error("Invalid Credentials.");
            }else{
                let userDataResponse = userDataResponseList[0];
                let roleResponse = await this.roleDAO.getDataByFilters({_id:userDataResponse.roleId})
                let userTokenData = {
                    userId:userDataResponse._id,
                    loginEmail: userDataResponse.email,
                    loginName:userDataResponse.firstName+" "+userDataResponse.lastName,
                    loginMobile: userDataResponse.mobile,
                    role:roleResponse.roleName
                }
                console.log("StudentService - End of loginUser");
                return userTokenData;
            }            
        } catch (error) {
            console.error("StudentService - End of loginUser || Error :", error);
            throw error;
        }
    }

}


module.exports = StudentService;