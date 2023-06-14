import React, { useEffect, useState } from 'react'
import '../../Sass/subComponentStyles/postComponent.scss'
import LikeButton from './LikeButton'
import {useNavigate} from 'react-router-dom'
import { getOtherUsers,deletePosts,getConnections } from '../../apis/FirestoreAPI'
import { ImUser } from 'react-icons/im'
import {GrEdit} from "react-icons/gr"
import {RiDeleteBin5Fill} from "react-icons/ri"
import { Modal } from 'antd'

const PostCard = ({ post,currentUser,setOpen, setStatus,setEditState, setCurrentPost, setPostImage}) => {
const navigate = useNavigate()
const [otherUsers, setOtherUsers] = useState([])
const [isConnected, setIsConnected] = useState(false)
// const [navigateStatus, setNavigateStatus] = useState(false)

const [postImgOpen , setPostImgOpen] = useState(false)

// const handleNavigate = ()=>{
// const state = {
//   id:post.userId,
//   eamil:post.userEmail
// }

// navigate("/profile",
//   {
//     state:state
// }
// )
// }
const handleEditIcon  = ()=>{
setOpen(true)
setEditState(true)
setCurrentPost(post)
// console.log(post.status)
setPostImage(post.postImage)
setStatus(post.status)
}
// // console.log(post.userId,post.userEmail)
useEffect(()=>{
getOtherUsers(setOtherUsers,post.userId)
getConnections(currentUser.userId,post.userId,setIsConnected)
  // console.log(otherUsers)
},[])

const postDelete =()=>{
deletePosts(post.id)
}


  return (
isConnected || post.userEmail === currentUser.email ?
<>
      <div className="postCard">
        {/* <img src={} alt="" /> */}

     {currentUser.email !== post.userEmail ? <></>:  <div className="postIcons">
<GrEdit size={25} className='icons' onClick={handleEditIcon} />
<RiDeleteBin5Fill size={25} className='icons' onClick={postDelete} />
        </div>}  

          <div className="postHeader">
          {otherUsers[0]? <img src={otherUsers[0].imageLink} alt="img" className='currentProfileImg' onClick={()=> navigate("/profile",{ state:{id:post?.userId, email:post?.userEmail}})}/> : <ImUser className="userIcon"onClick={()=> navigate("/profile",{ state:{id:post?.userId, email:post?.userEmail}})}/>}
          <p className='name'  onClick={()=> navigate("/profile",{ state:{id:post?.userId, email:post?.userEmail}})}>
  {otherUsers[0]?.name}
  </p>
          </div>
        <div className="matter">
<p className="postTimeStamp">{otherUsers[0]?.headline}</p>
        <p className="postTimeStamp">{post.timeStamp}</p>
        </div>
        <p className="postContent">{post.status}</p>   

       {post.postImage ? <img src={post.postImage} alt="postImage" className='postImg' onClick={()=>{
        setPostImgOpen(!postImgOpen)}} />:
       <></>} 


<Modal open={postImgOpen} onCancel={()=> setPostImgOpen(!postImgOpen)}
footer={null}
> <img src={post.postImage} alt="PostImage" className='modalPostImg'  

/> </Modal>
<LikeButton userId={currentUser.userId} postId= {post.postId} currentUser={currentUser} />
        </div>

        </>:<></>
  )
  }

export default PostCard
