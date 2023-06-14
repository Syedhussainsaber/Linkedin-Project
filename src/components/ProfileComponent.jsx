import React, { useEffect, useState,} from 'react'
import Topbar from './subComponents/Topbar'
import ProfileCard from './subComponents/ProfileCard'
import ProfileEdit from './subComponents/ProfileEdit'
// import { useLocation } from 'react-router-dom'

const ProfileComponent = ({currentUser, otherUsers, profileState,setProfileState}) => {
  const [isEdit, setIsEdit] = useState(false)


const editStatus = ()=>{
  setIsEdit(!isEdit)
}

  return (
   <>
 
<Topbar currentUser={currentUser} otherUsers={otherUsers} setProfileState={setProfileState}/>
{console.log(profileState)}
{
isEdit ? <ProfileEdit editStatus={editStatus} currentUser={currentUser} /> : <ProfileCard currentUser={currentUser} editStatus={editStatus} otherUsers = {otherUsers} profileState = {profileState} />
}

   </>
  )
}

export default ProfileComponent