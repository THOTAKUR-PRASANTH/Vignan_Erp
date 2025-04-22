import instance from "./redux/api";


export const UseStudentRegistration = async (data: any) => {
    return await instance.post("/student/studentRegistration", data)
        .then((res) => { 
            return res.data; 
        },)
        .catch((e) => {
            return {
                status: "Failure",
                message: e.response?.data?.message?e.response?.data?.message:e.message
            }
    })
}


export const UseStudentLogin = async (data: any) => {
    return await instance.post("/student/login", data)
        .then((res) => { return res.data; },)
        .catch((e) => {
            return {
                status: "Failure",
                message: e.response?.data?.message?e.response?.data?.message:e.message
            }
    })
}