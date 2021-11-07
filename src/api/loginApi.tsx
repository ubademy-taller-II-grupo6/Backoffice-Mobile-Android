import React, { useState } from 'react'
import { createUserWithEmailAndPassword_ } from '../../firebase';

export const loginApi =async  () => {
    let response = await  fetch('https://ddf29908-ec42-4f78-9e68-e880d130ec20.mock.pstmn.io/Ubademy', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    let json = await response.json();
    console.log("loginApi")
    let user = await createUserWithEmailAndPassword_("rparedestavara@gmail.com","1234567")
    //ToDo: Mandar al GateWay
    console.log(user)
    verifyToken("")
    console.log("sssc")
}

export const validateTokenGoogle = (idToken:string,body:any) => {
  const header=new Headers({
     'Authorization': 'Basic '+idToken, 
     'Content-Type': 'application/json',
   })
  const urlValidateToken = "http://127.0.0.1:8000/user/auth"
  fetch(urlValidateToken,{
    method: 'post', 
    headers: header,
    body
  })
  .then(res => {
    return res.json()
  })
}

export const signOuthWithGoogle=()=>{

}

export const verifyToken = (token:string) => {
  //todo pegarle al endPoint de Gateway
}