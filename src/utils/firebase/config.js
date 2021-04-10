import firebase from 'firebase'
// 
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: "nora-pack.firebaseapp.com",
    projectId: "nora-pack",
    storageBucket: "nora-pack.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: "G-SSRLDZ6QHC"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); 
 }

  export default firebase 