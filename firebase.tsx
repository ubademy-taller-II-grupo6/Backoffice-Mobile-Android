import firebase from 'firebase';
import { FirebaseResponseCode, ResponseDiccionary, ResponseRegisterEmailFirebase, UserFirebase } from './src/interface/AuthStateInterface';
import { uiService }  from './src/service/uiService';

require('firebase/auth')

const firebaseConfig = {
  apiKey: 'AIzaSyB5cvfwNdX_HP4pJODxxlNv4JRuIIWJp_s',
  authDomain: "ubademy-apigateway.firebaseapp.com",
  projectId: "ubademy-apigateway",
  storageBucket: "ubademy-apigateway.appspot.com",
  messagingSenderId: "934202487625",
  appId: '1:934202487625:android:80acdcfd6c6cbfcb20e098',
  measurementId: 'G-7085K4CLZJ',
};
let Firebase = null
if(!firebase.apps.length){
    Firebase = firebase.initializeApp(firebaseConfig);
}

let firebaseResponseCode:FirebaseResponseCode = {
  codes:[
    {
      code:"auth/email-already-in-use",
      response:"El usuario ya esta registrado"
    }
  ]
}

let authFirebase = firebase.auth()
let authFirebase_ = firebase.auth
var providerGoogle = new firebase.auth.GoogleAuthProvider();

export const createUserWithEmailAndPassword_ = async(email:string, password:string) => {
  let response = await  authFirebase.createUserWithEmailAndPassword( email, password)
    .then( (userCredential:any) => {
      // console.log(userCredential)
      const user:any = userCredential;
      uiService().alertaInformativa("","Registro éxitoso")
      return user
    })
    .catch((error:any) => {
      let encontrado = firebaseResponseCode.codes.find(x => x.code == error.code)
      uiService().alertaInformativa("",encontrado!=undefined?encontrado.response:"")
      return null
    });  
  return response
}


export const signInWithEmailAndPassword_ = (email:string, password:string) => firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
  // Signed in
  // console.log(userCredential)
  var user:any = userCredential.user;
  // ...
  return {
    isError:false,
    message:"",
    user:user
  }
})
.catch((error) => {
  let messageError = "Error en la data"
  if(error.message == "INVALID_PASSWORD" || error.message == "EMAIL_NOT_FOUND"){
    messageError="Datos Invalidos"
  }
  let errorResponse = {
    isError:true,
    message:messageError,
    user:null
  }
  return errorResponse
});


  export const signOut_ = () => authFirebase.signOut().then(() => {
  }).catch((error) => {
    console.log(error.message)
    console.log(error.code)
  });
  
export const registerWithGoogle = async (idToken:string,accessToken:string)=>{
    let credential = authFirebase_.GoogleAuthProvider.credential(idToken,accessToken)
    const googleProfileData = await firebase.auth().signInWithCredential(credential).then(data =>{ return data}).catch(error =>{return null})
    // alert('googleProfileData:' + JSON.stringify(googleProfileData, null, 2));
    /*console.log("credential")
    console.log(credential)
    console.log(googleProfileData) */
    return googleProfileData//firebase.auth().signInWithCredential(credential);
    /*const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    const googleProfileData = await firebase.auth().signInWithCredential(credential);
    this.onLoginSuccess.bind(this);*/
}

export const signInAsync2 =() =>{
  // console.log("signInAsync2")
  let credential = authFirebase_.GoogleAuthProvider.credential("idToken","accessToken")
    console.log("credential")
    console.log(credential)
    return firebase.auth().signInWithCredential(credential);
}

export const registerWithGoogleWeb = async ()=>{
  let data = await authFirebase.signInWithPopup(providerGoogle)
  .then((result) => {
    ///** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    console.log(result)
    //alert('login:' + JSON.stringify(result, null, 2));
    console.log(credential)
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential;
    // The signed-in user info.
    var user = result;
    return result
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log("error")
    return null
    // ...
  });
  return data
}
