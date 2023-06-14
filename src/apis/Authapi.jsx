import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { auth } from '../firebaseConfig'

export const LoginApi = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    return response ? response : ''
  } catch (err) {
    console.log(err)
  }
}

export const RegisterApi = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    return response ? response : ''
  } catch (err) {
    console.log(err)
  }
}

export const GoogleApi = async () => {
  try {
    const googleProvider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, googleProvider)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const logoutApi = async ()=>{
  try{
await signOut(auth)
  }
  catch(e){
console.log(e)
  }
}