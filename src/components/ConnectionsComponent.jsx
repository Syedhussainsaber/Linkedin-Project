import React,{useEffect, useState} from 'react'
import Topbar from './subComponents/Topbar'
import { getCurrentUser,getAllUsers } from '../apis/FirestoreAPI'
import ConnectionChild from './subComponents/ConnectionChild'
import "../Sass/subComponentStyles/connectionComponent.scss"
import "../Sass/subComponentStyles/postComponent.scss"
const ConnectionsComponent = () => {
   const [currentUser, setCurrentUser] = useState({})
   const [allUsers, setAllUsers] = useState([])
    useEffect(()=>{
        getCurrentUser(setCurrentUser)
        getAllUsers(setAllUsers)
       
    },[])
  return (
<>
<Topbar currentUser = {currentUser} otherUsers = {allUsers}/>
<div className="connectionComponent">
    <div className="connectionContainer">
    {allUsers.map((user)=>{
        if(user.email != currentUser.email){
            return <ConnectionChild user={user} currentUser={currentUser}/>
        }
    })}
    </div>
</div>
</>
  )
}

export default ConnectionsComponent