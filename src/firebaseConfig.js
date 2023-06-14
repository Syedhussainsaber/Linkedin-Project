// Import the functions you need from the SDKs you need
import { initializeApp,} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCEa0Bpg-ozm2p8uZPhkgBqclyNQkYIvjU',
  authDomain: 'linkedin-clone-83af9.firebaseapp.com',
  projectId: 'linkedin-clone-83af9',
  storageBucket: 'linkedin-clone-83af9.appspot.com',
  messagingSenderId: '786039953381',
  appId: '1:786039953381:web:b714f49ff81ea02257810c',
}


// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
export { auth, firestore, storage,app }
