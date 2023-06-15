import '../../Sass/subComponentStyles/postComponent.scss'
import { ImUser } from 'react-icons/im'
import { Modal } from 'antd'
import { useEffect, useState} from 'react'
import { PostStatus, getPosts,postUpdateData} from '../../apis/FirestoreAPI'
import PostCard from './PostCard'
import { GetCurrentTimeStamp } from '../../apis/GetCurrentTimeStamp'
import {getUniqueId} from "../../apis/UniqueId"
import {BsCardImage} from "react-icons/bs"
import { uploadPostImage } from '../../apis/ImageApi'
import React from 'react';
import '../../Sass/subComponentStyles/topBar.scss'
import { AiFillHome, AiFillMessage,AiOutlineSearch } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { BsBriefcaseFill } from 'react-icons/bs'
import { MdNotifications } from 'react-icons/md'
// import { ImUser } from 'react-icons/im'
// import { logoutApi } from '../../apis/Authapi'
// import { logoutApi } from '../../apis/Authapi'
import { Progress } from 'antd';
import { useNavigate } from 'react-router-dom'

const PostComponent = ({currentUser}) => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [allPosts, setAllPosts] = useState([])
  const [editState, setEditState] =  useState(false)
  const [currentPost, setCurrentPost] = useState({})

  const [postImage , setPostImage] = useState("")
  const [imgProgress, setImageProgress] = useState(0)
const navigate = useNavigate()

  useEffect(() => {
    getPosts(setAllPosts)

 }, [])

 
  const showModal = () => {
    setOpen(true)
    setEditState(false)
  }

  const handleOk =  () => {
    let postDetails = {
      status: status,
      timeStamp: GetCurrentTimeStamp('LLL'),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postId :getUniqueId(),
      userId : currentUser.userId,
      postImage : postImage
    }
    PostStatus(postDetails)
    setStatus('')
    setEditState(!editState)
    setImageProgress(0)
    setPostImage("")
    setOpen(false)
  }

  const handleCancel = () => {
    // console.log('Clicked cancel button')
    setOpen(false)
    setStatus("")
    setImageProgress(0)
    setPostImage("")
    setEditState(!editState)
  }

  const handleEdit = ()=>{
if(status || postImage){
 postUpdateData(currentPost.id,{status:status,postImage:postImage})
}
setOpen(false)
setStatus('')
setImageProgress(0)
setPostImage("")
    setEditState(!editState)
  }

 
  return (
    <>
      <div className="postComponent">
        <div className="postContainer">
          {console.log(currentUser)}
          {currentUser?.imageLink? <img src={currentUser.imageLink} alt="img" className='currentProfileImg'/> : <ImUser className="userIcon" />}
          <button className="post-btn" onClick={showModal}>
            Start a post
          </button>
          <Modal
            title="Create a post"
            open={open}
            onOk={editState? handleEdit : handleOk}
            onCancel={handleCancel}
            okText={editState?"Update":"Post"}
            okButtonProps={{ disabled: status || postImage ? false : true }}
            className='modal'
          >
            <input
              type="text"
              placeholder="What do you want to talk about?"
              className="modalInput"
              onChange={(e) => setStatus(e.target.value)}
              value={setOpen ? status : ''}
            />
            

            <div className="imgSection">
{imgProgress===0 || imgProgress===100 ? <></> : <Progress type="circle" percent={imgProgress} size={70} className='progressLoad' />}
            
{postImage? <img src={postImage} alt='postImage' className='postImage'/> :
<></>}
<label htmlFor="imgInput"><BsCardImage size={30} className='imgIcon'/></label>
{console.log(imgProgress)}
            <input type="file" id='imgInput' onChange={(event)=> {uploadPostImage(event.target.files[0],setPostImage, setImageProgress)
            }} />
            </div>
          </Modal>
        </div>
        {allPosts.map((post) => {
          if(post.userEmail===localStorage.getItem("userEmail")){
            post.userName=currentUser.name
          }
          
          return (
          <div key={post.postId} >
          <PostCard post={post} currentUser={currentUser} setOpen={setOpen} setStatus={setStatus} setEditState={setEditState} setCurrentPost={setCurrentPost} setPostImage={setPostImage} />
          </div>
          )
        })}

  
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

export default PostComponent
