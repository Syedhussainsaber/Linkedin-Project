import React,{useState,useEffect} from 'react'
import ConnectionsComponent from '../components/ConnectionsComponent'
import LoaderComponent from '../components/common/LoaderComponent'
import '../Sass/common/loader.scss'
import { getCurrentUser,getOtherUsers } from '../apis/FirestoreAPI'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'

const Connections = () => {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
useEffect(()=>{
    onAuthStateChanged(auth, (res) => {
        try {
          if (res.accessToken) {
            setLoader(false) 
            navigate('/connections')

            // console.log(location)
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
},[])

  return (
  loader ? <LoaderComponent/> : <ConnectionsComponent/>
  )
}

export default Connections