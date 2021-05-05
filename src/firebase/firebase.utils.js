import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCZND00i8uDP9cCFJ0ea7E_r2E884U_rnU",
  authDomain: "crwn-db-a79ea.firebaseapp.com",
  projectId: "crwn-db-a79ea",
  storageBucket: "crwn-db-a79ea.appspot.com",
  messagingSenderId: "1024223448603",
  appId: "1:1024223448603:web:26e335cc3a9e9b07dcf2be",
  measurementId: "G-GCFYRV0YWS"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
