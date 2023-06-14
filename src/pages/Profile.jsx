import React,{useState,useEffect,useMemo} from 'react'
import ProfileComponent from '../components/ProfileComponent'
import LoaderComponent from '../components/common/LoaderComponent'
import '../Sass/common/loader.scss'
import { getCurrentUser,getOtherUsers } from '../apis/FirestoreAPI'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigate,useLocation } from 'react-router-dom'


const Profile = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [profileState, setProfileState] = useState({})
    const [loader, setLoader] = useState(true)
    const [currentUser, setCurrentUser] = useState({})

    const [otherUsers , setOtherUsers] = useState([])

    useEffect(()=>{
setProfileState(location.state)
// console.log(profileState)
    },[location.state.id])

    useEffect(() => {
     onAuthStateChanged(auth, (res) => {
        try {
          if (res.accessToken) {
            setLoader(false) 
            navigate('/profile',{
              state:{
                id:"",
                email:""
              }
            })
            setProfileState(location.state)
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

    useMemo(()=>{
        getCurrentUser(setCurrentUser)
        getOtherUsers(setOtherUsers)
          },[])
  return (
    loader ? <LoaderComponent /> : <ProfileComponent currentUser={currentUser} otherUsers={otherUsers} profileState={profileState} setProfileState={setProfileState}/>
  )
}

export default Profile