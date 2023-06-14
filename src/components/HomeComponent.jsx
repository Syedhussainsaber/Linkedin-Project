import React, { useEffect,useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import Topbar from './subComponents/Topbar'
import PostComponent from "./subComponents/PostComponent"


const HomeComponent = ({currentUser, otherUsers}) => {
  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      setUser(res.email)
    })
  }, [])

  return (
    <div>
      <Topbar currentUser = {currentUser} otherUsers = {otherUsers} />
      <PostComponent currentUser = {currentUser} otherUsers = {otherUsers} />
    </div>
  )
}

export default HomeComponent
