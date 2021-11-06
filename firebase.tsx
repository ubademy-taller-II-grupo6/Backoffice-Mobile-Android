import firebase from 'firebase';
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
if(!Firebase){
    Firebase = firebase.initializeApp(firebaseConfig);
}

let authFirebase = firebase.auth()
let authFirebase_ = firebase.auth
var provider = new firebase.auth.GoogleAuthProvider();

export const createUserWithEmailAndPassword_ = (email:string, password:string) => authFirebase.createUserWithEmailAndPassword( email, password)
  .then((userCredential:any) => {
    // Signed in
    console.log("userCredential")
    console.log(userCredential)
    const user = userCredential.user;
  })
  .catch((error:any) => {
    console.log("catch")
    console.log(error)
    console.log(error.message)
    console.log(error.code)
  });

  export const signOut_ = () => authFirebase.signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.log(error.message)
    console.log(error.code)
  });
  
export const registerWithGoogle = async (idToken:string,accessToken:string)=>{
    let credential = authFirebase_.GoogleAuthProvider.credential(idToken,accessToken)
    const googleProfileData = await firebase.auth().signInWithCredential(credential);
    console.log("credential")
    console.log(credential)
    console.log(googleProfileData)
    return firebase.auth().signInWithCredential(credential);
    /*const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    const googleProfileData = await firebase.auth().signInWithCredential(credential);
    this.onLoginSuccess.bind(this);*/
}

export const signInAsync2 =() =>{
  console.log("signInAsync2")
  let credential = authFirebase_.GoogleAuthProvider.credential("idToken","accessToken")
    console.log("credential")
    console.log(credential)
    return firebase.auth().signInWithCredential(credential);
}

export const registerWithGoogleWeb = ()=>{
  authFirebase.signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    alert('login:' + JSON.stringify(credential, null, 2));
    return credential
    console.log(credential)
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
