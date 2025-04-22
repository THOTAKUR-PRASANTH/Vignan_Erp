import { PopupAction, LoadingAction } from './redux/commonSlice';
import { store } from "./redux/store";
import { saveLoginDetails } from '../src/redux/loginSlice';


export const ShowMessagePopup = (type, message, redirectOnSuccess, time?) => {
  try{
  store.dispatch(PopupAction({ enable: true, type: type, message: message, redirectOnSuccess, time: time ? time : null }));
  }catch(error){
    alert("error ::: ");
  }
}

export const Loading = (value: boolean) => { store.dispatch(LoadingAction({ enable: value })); }

export const CallingAxios = async (myFunction) => {
  Loading(true);
  let result = await myFunction;
  Loading(false);
  return result;
}


export const KeepLoggedIn = () => {
  let data: any = localStorage.getItem("LoginDetails");
  // console.log(data);
  data = JSON.parse(data)
  if (data && data.token) {
      store.dispatch(saveLoginDetails(data));
    return true;
  } else {
    localStorage.clear();
    return false;
  }
}

export const LoggedOut = () => {
  store.dispatch(saveLoginDetails(null));
  localStorage.clear();
  ShowMessagePopup(true, "Logged out successfully.", "/");
}




