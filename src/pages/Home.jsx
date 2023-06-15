import React, { useEffect, useState,useMemo, } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import HomeComponent from '../components/HomeComponent'
import LoaderComponent from '../components/common/LoaderComponent'
import '../Sass/common/loader.scss'
import { getCurrentUser,getOtherUsers } from '../apis/FirestoreAPI'


const Home = () => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      try {
        if (res.accessToken) {
          setLoader(false)
          navigate('/home')
        } else if (!res.accessToken) {
          setLoader(false)
          navigate('/')
        } else {
          setLoader(false)
          navigate('/')
        }
        // console.log(res.accessToken)
      } catch (err) {
        setLoader(false)
        navigate('/')

        console.log(err)
      }
    })
  }, [])

  useEffect(()=>{
    getCurrentUser(setCurrentUser)

      },[])
    
  return loader ? <LoaderComponent /> : <HomeComponent currentUser={currentUser}  />
}

export default Home
