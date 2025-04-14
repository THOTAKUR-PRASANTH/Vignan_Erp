const StudentService = require("../services/studentService");
const {createToken} = require('../middleware/authorizationFilter');

class StudentHandler {

    constructor(){
        this.studentService = new StudentService();
    }

    studentRegistration = async (req, res) => {
        let requestData = req.body;
        console.log("StudentHandler - Insdie of studentRegistration");
        try {
             if (!requestData || !requestData.email || !requestData.category || !requestData.country
                || !requestData.course || !requestData.firstName || !requestData.course || !requestData.dob
                || !requestData.lastName || !requestData.mobile || !requestData.specialization || !requestData.program) {
                console.log("StudentHandler - End of studentRegistration");
                return res.status(400).send(
                {
                    status: "Failure",
                    message: "Bad Request",
                    code: "400",
                });
            }
        
            let response = await this.studentService.studentRegistration(requestData);
            console.log("StudentHandler - End of studentRegistration");
            res.status(200).send(
                {
                    status:"Success", 
                    message: "Student Registration completed Successfully.",
                    code: "200",
                    data: response
                }
            );
            return;
        } catch (error) {
            console.error("StudentHandler - End of studentRegistration || Error :", error);
            res.status(501).send(
                {
                    status: "Failure",
                    message: error.message ? error.message : "Internal Server Issue. Please try after sometime."
                }
            );
            return;
        }
    }


    loginUser = async (req, res) => {
        let requestData = req.body;
        console.log("StudentHandler - Insdie of loginUser");
        try {
             if (!requestData || !requestData.email || !requestData.password ) {
                console.log("StudentHandler - End of loginUser");
                return res.status(400).send(
                {
                    status: "Failure",
                    message: "Bad Request",
                    code: "400",
                });
            }
        
            let response = await this.studentService.loginUser(requestData);
            const token = await createToken(response);
            response["token"] = token;
            console.log("StudentHandler - End of loginUser");
            res.status(200).send(
                {
                    status:"Success", 
                    message: "User logged in Successfully.",
                    code: "200",
                    data: response
                }
            );
            return;
        } catch (error) {
            console.error("StudentHandler - End of studentRegistration || Error :", error);
            res.status(501).send(
                {
                    status: "Failure",
                    message: error.message ? error.message : "Internal Server Issue. Please try after sometime."
                }
            );
            return;
        }
    }

    
    refreshToken = async(req,res)=>{
		try{
			let tokenHeader = req.headers['authorization']
			if (tokenHeader) {
				let token = await tokenHeader.split(" ");
	
				let decoded = jwt.decode(token[1], process.env.JWT_SECRET_KEY);
				console.log(" decoded :: ", decoded);
				if (decoded) {
					let currentTime = (new Date().getTime())/1000;
	
					let expiredVal = decoded.exp;
					const expiresIn = parseInt(process.env.JWT_RESET_EXP_IN.replace("m",""));
					expiredVal = expiredVal+expiresIn*60;
					if(expiredVal < currentTime)
						return res.status(400).send({ status: "Failure", message: 'Token Validity Expired.' });
					else
					{
						delete decoded.exp;
						delete decoded.iat;
						const token = await createToken(decoded);
						return res.status(200).send(
						{	status:"Sucess",
							data:token
						});
					}
				}else {
					return res.status(400).send({ status: "Failure", message: 'Unauthorized Token' })
				}
			}else{
				return res.status(400).send({ status: "Failure", message: 'Unauthorized Access' })
			}
	
		}catch(ex){
			return res.status(500).send({
				status: "Failure",
				message: ex.message
			});
		}
	}

}

module.exports = StudentHandler;