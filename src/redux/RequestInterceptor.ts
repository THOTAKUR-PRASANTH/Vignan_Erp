import instance from './api';
import { ShowMessagePopup } from '../GenericFunctions';

const SetUp = () => {
    instance.interceptors.request.use(
        function (config:any) {
            const data:any = localStorage.getItem("LoginDetails");
            let parsedData;
            try {
                parsedData = JSON.parse(data);
                if (parsedData && parsedData.token) {
                    config.headers ["Authorization"] = 'Bearer ' + parsedData.token;
                }
            } catch { parsedData = false; }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(async (response) => {
        return response;
    }, async (error) => {
        const originalConfig = error.config;
        if (error && error.response && error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                const g:any = localStorage.getItem("LoginDetails");
                let parsedData;
                try {
                    parsedData = JSON.parse(g);
                    if (parsedData && parsedData.token) {
                        const rs = await instance.get('/student/refreshToken');
                        if(rs.data.data){
                            parsedData.token = rs.data.data.token;
                            localStorage.setItem("LoginDetails",JSON.stringify(parsedData));
                            return instance(originalConfig)
                        }
                        else {
                            console.log('refreshToken API failed');
                            localStorage.clear();
                            ShowMessagePopup(false, "Session Expired", "/");
                            // setTimeout(() => {
                            //     window.location.href = "/vignan";
                            // }, 0)
                        }
                    } else {
                        console.log('token not found');
                        localStorage.clear();
                        ShowMessagePopup(false, "Session Expired", "/");

                        // setTimeout(() => {
                        //     window.location.href = "/";
                        // }, 0)

                    }
                } catch (error) {
                    console.log(' Refresh Token Failed');
                    localStorage.clear();
                    ShowMessagePopup(false, 'Session Expired', "/vignan");
                   // setTimeout(() => {
                            //     window.location.href = "/vignan";
                            // }, 0)
                    return Promise.reject(error);
                }
               
            } catch (error) {
                console.log(' Refresh Token Failed', error);
                localStorage.clear();
                ShowMessagePopup(false, 'Session Expired', "/vignan");
                //setTimeout(() => { window.location.href = "/vignan"; }, 0)
                return Promise.reject(error);
            }
        }
        else if (error.response.status === 401) {
            console.log(' refresh token 2nd time failed')
            localStorage.clear();
            ShowMessagePopup(false, 'Session Expired', "/vignan");
            //setTimeout(() => { window.location.href = "/vignan"; }, 0)
        }
        return Promise.reject(error);
    });


}
export default SetUp;
