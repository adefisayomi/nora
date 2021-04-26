import firebase from 'firebase'
// 
const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_apiKey,
   authDomain: process.env.NEXT_PUBLIC_authDomain,
   projectId: process.env.NEXT_PUBLIC_projectId,
   storageBucket: process.env.NEXT_PUBLIC_storageBucket,
   messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
   appId: process.env.NEXT_PUBLIC_appId
 };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); 
 }

  export default firebase 