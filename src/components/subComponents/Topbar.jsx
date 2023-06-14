import React, { useEffect, useState } from 'react'
import '../../Sass/subComponentStyles/topBar.scss'
import { AiFillHome, AiFillMessage,AiOutlineSearch } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { BsBriefcaseFill } from 'react-icons/bs'
import { MdNotifications } from 'react-icons/md'
import { ImUser } from 'react-icons/im'
import { logoutApi } from '../../apis/Authapi'
import {useLocation, useNavigate} from "react-router-dom"
import {getAllUsers} from "../../apis/FirestoreAPI"
// import LogoutComponent from '../LogoutComponent'

const Topbar = ({currentUser, otherUsers,setProfileState}) => {
  const [logoutState, setLogoutState] = useState(false)
  const [logoutState2, setLogoutState2] = useState(false)
  const [users, setUsers] = useState([])
const location = useLocation()
const [searchInput, setSearchInput] = useState("")
const [filteredUsers, setFilteredUsers] =  useState([])
const [user, setUser] = useState({})

const navigate = useNavigate()

useEffect(()=>{
getAllUsers(setUsers)
setSearchInput("")
},[])

const handleSearch = ()=>{
setFilteredUsers(users.filter((user)=>{
return Object.values(user).join("").toLowerCase().includes(searchInput.toLowerCase())

}))

}



useEffect(()=>{
setTimeout(()=>{
handleSearch()
},1000)

},[searchInput])


  return (
    <>
      <div className="component">
        <div className="topBarComponent">
          <div className="topBarContainer1">
            <img src="Linkedin-logo.png" alt="LinkedIn" className="logo" onClick={()=> navigate("/home")}/>
            <input type="text" placeholder="Search"  className="searchBar" value={searchInput?searchInput:""} onChange={(event)=> setSearchInput(event.target.value)}/>
            <AiOutlineSearch size={25} className='searchIcon' onClick={()=> { location.pathname === "/profile" ?
setProfileState({
                  id:user?.userId,
                  email:user?.email
                }):navigate("/profile",{state:{
id:user?.userId,
email: user?.email
            }, replace:true})

             setSearchInput("")
            }}/>
            {/* {console.log(user)} */}
            {console.log(searchInput)}
            {/* <BiSearch className="searchIcon" /> */}
          </div>
        
          <div className="topBarContainer2">
            <AiFillHome className="navIcons" onClick={()=> navigate("/home")} />
            <FaUserFriends className="navIcons" onClick={()=> navigate("/connections")} />

            <BsBriefcaseFill className="navIcons" />
            <AiFillMessage className="navIcons" />
            <MdNotifications className="navIcons" />
            <ImUser className="navIcons" onMouseOver={()=> setLogoutState(true)} onMouseOut={()=>setLogoutState(false)} onClick={()=> setLogoutState2(true)} onDoubleClick={()=> setLogoutState2(false)} />
            {
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
            }

        </div>
       
        </div>
      </div>
      {searchInput.length===0?<></>:  <div className="searchResults">

{filteredUsers.length === 0 ?
<div className="searchChild"><p>User Not Found</p></div>
:
filteredUsers.map((user)=>{

return  <div className="searchChild" onClick={()=> {
setUser(user)
// console.log(user)
setSearchInput(user?.name)
}}><p>{user.name}</p> 
{user.imageLink ? <img src={user.imageLink} alt="image" className='image' />: <ImUser className='image'/>}
</div>
})}
     
                 </div>}
    
    </>
  )
}
export default Topbar
