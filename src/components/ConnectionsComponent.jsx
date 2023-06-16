import React,{useEffect, useState} from 'react'
import Topbar from './subComponents/Topbar'
import { getCurrentUser,getAllUsers } from '../apis/FirestoreAPI'
import ConnectionChild from './subComponents/ConnectionChild'
import "../Sass/subComponentStyles/connectionComponent.scss"
import "../Sass/subComponentStyles/postComponent.scss"
import { AiFillHome, AiFillMessage,AiOutlineSearch } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { BsBriefcaseFill } from 'react-icons/bs'
import { MdNotifications } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
// import "../Sass/subComponentStyles/topBar.scss"
const ConnectionsComponent = () => {
   const [currentUser, setCurrentUser] = useState({})
   const [allUsers, setAllUsers] = useState([])
   const navigate = useNavigate()
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


    <div className="topBarContainer2">
            <AiFillHome className="navIcons" onClick={()=> {navigate("/home")}} />
            <FaUserFriends className="navIcons" onClick={()=> navigate("/connections")} />

            <BsBriefcaseFill className="navIcons" />
            <AiFillMessage className="navIcons" />
            <MdNotifications className="navIcons" />
            {/* <ImUser className="navIcons" onMouseOver={()=> setLogoutState(true)} onMouseOut={()=>setLogoutState(false)} onClick={()=> setLogoutState2(true)} onDoubleClick={()=> setLogoutState2(false)} /> */}
            {/* {
              logoutState || logoutState2?<div className="logoutContainer">
                <button onClick={()=> 
                navigate("/profile",{
                  state:{
                    id: currentUser.userId,
                    email: currentUser.email
                  },replace:true
                })}>View Profile</button>
              <button onClick={logoutApi}>Logout</button>
              </div>:""
            } */}

        </div>

</div>
</>
  )
}

export default ConnectionsComponent