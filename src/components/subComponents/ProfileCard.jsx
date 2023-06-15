import React,{useState, useEffect} from 'react'
import "../../Sass/subComponentStyles/profileCard.scss"
import { getPosts } from '../../apis/FirestoreAPI'
import PostCard from './PostCard'
import { Modal } from 'antd'
import { imageUpload } from '../../apis/ImageApi'
import { getSinglePost,getSingleUser } from '../../apis/FirestoreAPI'
import { ImUser } from 'react-icons/im'



const ProfileCard = ({currentUser,editStatus, otherUsers,profileState}) => {

  const [allPosts, setAllPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [singlePosts, setSinglePosts] = useState([])
  const [currentImage,setCurrentImage] = useState({})

const [currentProfile , setCurrentProfile] = useState({})

const handleCancel = () => {
  console.log('Clicked cancel button')
  setOpen(!open)
  setCurrentImage({})
}

// useEffect(()=>{
//   console.log(profileState.email,"!")
//   },[profileState?.id])
  


useEffect(() => {
if(profileState?.id){
getSinglePost(setSinglePosts,profileState?.id) 
}
if(profileState?.email){
 getSingleUser(setCurrentProfile, profileState?.email)
}
 getPosts(setAllPosts)
 }, [profileState?.id])

 const uploadImage = ()=>{
 imageUpload(currentUser.userId,currentImage).then((url)=>{
console.log(url)
setCurrentImage({})
setOpen(!open)
 })
 .catch((err)=>{
console.log(err)
 })
 }
  return (
    <> 
    <div className="profileCard">
{
  currentProfile.email === currentUser.email || Object.values(currentProfile).length===0 ?
  <div className="edit-btn">
        <button onClick={editStatus}>Edit</button>
      </div>:""
}


      
<div className='profile-info'>

<div className="left-info">
<div className="profile">
{(currentUser.imageLink || currentProfile.imageLink) ? ((Object.values(currentProfile).length===0) ?  <img src={currentUser.imageLink} alt="Profile-img" className='profileImage' onClick={()=> setOpen(!open)} />:<img src={currentProfile.imageLink} alt="Profile-img" className='profileImage' onClick={()=> currentProfile.email===currentUser.email ? setOpen(!open):""} /> ): <img src={'/userProfile.jpeg'} onClick={()=> setOpen(!open)} className='profileImage' />}
<Modal
            title="Change the profile"
            open={open}
            onOk={uploadImage}
            onCancel={handleCancel}
            okText="upload"
okButtonProps={{disabled:currentImage.name?false:true}}
          >
           <input type='file' onChange={(event)=> setCurrentImage(event.target.files[0])}/>
          </Modal>

</div>

<h3 className='userName'>{Object.values(currentProfile).length===0 ? currentUser.name: currentProfile.name}</h3>
<p className='userHeadline'>{Object.values(currentProfile).length===0 ? currentUser.headline : currentProfile.headline}</p>

<p className='userHeadline'><span style={{color:"#0072b1"}}>Skills:</span>{Object.values(currentProfile).length===0 ? currentUser.skills? " "+currentUser.skills : " No Skills": currentProfile.skills ? " "+currentProfile.skills : " No Skills"}</p>
<p className='userLocation'>{Object.values(currentProfile).length===0 ? currentUser.location: currentProfile.location}</p>
</div>

<div className='right-info'>
<p className='college'>{Object.values(currentProfile).length===0 ? currentUser.college : currentProfile.college}</p>
<p className='company'>{Object.values(currentProfile).length===0? currentUser.company : currentProfile.company}</p>
</div>

</div>
  </div>
<div className="postComponent">
  {singlePosts.map((post) => {
    if(post.userEmail === localStorage.getItem("userEmail")){
      post.userName=currentUser.name
      }
          return(
            <div key={post.postId}> 
          <PostCard post={post} currentUser={currentUser} />
          </div>
          ) 
        })}
</div>
    </>
  )
}

export default ProfileCard