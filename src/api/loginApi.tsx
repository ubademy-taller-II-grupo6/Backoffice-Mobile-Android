import React from 'react'
import { createUserWithEmailAndPassword_, signInWithEmailAndPassword_ } from '../../firebase';

export const loginApi = () => {

  let registerWithEmailFirebase = async(email:string,password:string) => {
    console.log("registerWithEmailFirebase")
    let user = await createUserWithEmailAndPassword_(email,password)
    console.log(user)
    return user
  }

  let loginWithEmailFirebase = async(email:string,password:string) => {
    console.log("loginWithEmailFirebase")
    let user = await signInWithEmailAndPassword_(email,password)
    console.log(user)
    return user
  }

  return { 
    registerWithEmailFirebase,
    loginWithEmailFirebase
  }
}
/*
export const loginApi =async  () => {
  const loderContext = useContext(LoderContext)
  loderContext.changeStateLoder(true)
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
    loderContext.changeStateLoder(false)
}

export const registerWithEmailFirebase = () => {
  const loderContext = useContext(LoderContext)

  loderContext.changeStateLoder(true)


  loderContext.changeStateLoder(false)
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
}*/