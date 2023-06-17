import React, { useState,useEffect } from 'react'
import RegisterComponent from '../components/RegisterComponent'
import { useNavigate } from 'react-router-dom'
import LoaderComponent from '../components/common/LoaderComponent'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { getAllUsers } from '../apis/FirestoreAPI'

const Register = () => {
  const navigate = useNavigate()
  const [loader,setLoader] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      try {
        if (res.accessToken) {
          setLoader(false)
          navigate('/home')
        
        } else if (!res.accessToken) {
          setLoader(false)
          navigate('/login')
        }
        console.log(res.accessToken)
      } catch (err) {
        setLoader(false)
        // navigate('/')
        console.log(err)
      }
    })
  }, [])
  return loader?<LoaderComponent /> :<RegisterComponent />
}

export default Register
