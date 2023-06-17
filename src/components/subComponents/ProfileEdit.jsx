import React from 'react'
import "../../Sass/subComponentStyles/profileCard.scss"
import { useState } from 'react'
import { updateProfileData } from '../../apis/FirestoreAPI'

const ProfileEdit = ({editStatus,currentUser}) => {
    const [editInput, setEditInput] = useState({})

    const updateProfile = async ()=>{
        // console.log(currentUser.userId)
     await updateProfileData(currentUser?.userId, editInput)
localStorage.setItem("userName", editInput?.name)
     await editStatus()
        }

        
const getEditInput = (event)=>{
    let {name,value} = event.target
let input = {[name]:value}
// console.log(input)
setEditInput({...editInput,...input})
// console.log(editInput)
}


  return (
<>
<div className="profileCard">
<div className="goback-btn">
        <button onClick={editStatus}>GO back</button>
      </div>
      <div className="edit-inputs">
<input type="text" className="common-edit-input" placeholder='Name' name='name' onChange={getEditInput} />
<input type="text" className="common-edit-input" placeholder='Headline' name='headline' onChange={getEditInput} />
<input type="text" className="common-edit-input" placeholder='Location' name='location' onChange={getEditInput} />
<input type="text" className="common-edit-input" placeholder='Company' name='company' onChange={getEditInput} />
<input type="text" className="common-edit-input" placeholder='Skills' name='skills' onChange={getEditInput} />
<input type="text" className="common-edit-input" placeholder='College' name='college' onChange={getEditInput} />
</div>

<div className="save-container">
<button className='login-btn' onClick={updateProfile}>Save</button>
</div>
</div>
</>
  )
}

export default ProfileEdit