import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { CallingAxios, KeepLoggedIn, ShowMessagePopup } from '../GenericFunctions';


const landingpage = () => {
  let LoginDetails = useAppSelector((state: any) => state.login.loginDetails);
  

  useEffect(() => {
    if (KeepLoggedIn()) {
      console.log("LoginDetails :::::", LoginDetails);
      //Add Logic here 
    } else { ShowMessagePopup(false, "Invalid Access", "/") }
}, []);


  return (
    <div>
      <div>landingpage</div>
      <div>{JSON.stringify(LoginDetails)}</div>
    </div>
  )
}

export default landingpage;